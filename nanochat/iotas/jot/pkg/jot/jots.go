package jot

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/nanobus/iota/go/wasmrs/await"
	"github.com/nanobus/iota/go/wasmrs/flow"
	"github.com/nanobus/iota/go/wasmrs/rx/flux"
	"github.com/nanobus/iota/go/wasmrs/rx/mono"

	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/follow"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/like"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/message"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/user"
)

type JotsImpl struct {
	messageStore message.MessageStore
	userStore    user.UserStore
	followStore  follow.FollowStore
	likeStore    like.LikeStore
}

var _ = (Jots)((*JotsImpl)(nil))

func NewJots(deps *Dependencies) *JotsImpl {
	return &JotsImpl{
		messageStore: deps.MessageStore,
		userStore:    deps.UserStore,
		followStore:  deps.FollowStore,
		likeStore:    deps.LikeStore,
	}
}

func (j *JotsImpl) PostJot(ctx context.Context, messageText string) mono.Mono[Jot] {
	return mono.Create(func(sink mono.Sink[Jot]) {
		j.userStore.Me(ctx).Subscribe(mono.Subscribe[user.User]{
			OnSuccess: func(me user.User) {
				j.messageStore.Store(ctx, messageText).Subscribe(mono.Subscribe[message.Message]{
					OnSuccess: func(msg message.Message) {
						jot := messageToJot(msg)
						jot.Handle = me.Handle
						sink.Success(jot)
					},
					OnError: sink.Error,
				})
			},
			OnError: sink.Error,
		})
	})
}

func (j *JotsImpl) GetFeed(ctx context.Context, before *time.Time, limit uint32) mono.Mono[JotPage] {
	var (
		f = flow.New[JotPage]()

		follows      flux.Flux[follow.FollowRef]
		followIds    = make([]uuid.UUID, 0, 20)
		feedMessages flux.Flux[message.Message]
		jots         = make([]Jot, 0, limit)
		ids          = make([]uuid.UUID, 0, limit)
		userIds      = make([]uuid.UUID, 0, limit)
		userMap      = make(map[uuid.UUID][]int)
		lookup       = make(map[uuid.UUID]int)

		page = JotPage{
			Before: before,
			Limit:  limit,
		}
	)

	return f.Steps(func() (await.Group, error) {
		follows = j.followStore.MyFollows(ctx)
		follows.Subscribe(flux.Subscribe[follow.FollowRef]{
			OnNext: func(f follow.FollowRef) {
				followIds = append(followIds, f.ID)
			},
		})
		return await.All(follows)
	}, func() (await.Group, error) {
		feedMessages = j.messageStore.GetFeed(ctx, followIds, before, limit)
		feedMessages.Subscribe(flux.Subscribe[message.Message]{
			OnNext: func(msg message.Message) {
				index := len(jots)
				lookup[msg.ID] = index
				jot := messageToJot(msg)
				ids = append(ids, jot.ID)
				jots = append(jots, jot)
				indexes, ok := userMap[jot.UserID]
				if !ok {
					userIds = append(userIds, jot.UserID)
					indexes = make([]int, 0, 5)
				}
				userMap[jot.UserID] = append(indexes, index)
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})
		return await.All(feedMessages)
	}, func() (await.Group, error) {
		page.Items = jots
		if len(ids) == 0 {
			return f.Success(page)
		}

		multipleUsers := j.userStore.GetMultiple(ctx, userIds)
		multipleUsers.Subscribe(flux.Subscribe[user.User]{
			OnNext: func(u user.User) {
				if indexes, ok := userMap[u.ID]; ok {
					for _, index := range indexes {
						jots[index].Handle = u.Handle
					}
				}
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})

		multipleLikes := j.likeStore.GetMultiple(ctx, ids)
		multipleLikes.Subscribe(flux.Subscribe[like.Likable]{
			OnNext: func(likable like.Likable) {
				if index, ok := lookup[likable.ID]; ok {
					jots[index].Likes = likable.Likes
				}
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})

		return await.All(multipleUsers, multipleLikes)
	}, func() (await.Group, error) {
		return f.Success(page)
	}).Mono()
}

func (j *JotsImpl) GetJot(ctx context.Context, id uuid.UUID) mono.Mono[Jot] {
	var (
		f           = flow.New[Jot]()
		messageMono mono.Mono[message.Message]
		likeMono    mono.Mono[like.Likable]
		userMono    mono.Mono[user.User]
		jot         Jot
	)

	return f.Steps(func() (await.Group, error) {
		// Concurrently fetch the message and likable.
		messageMono = j.messageStore.Load(ctx, id)
		likeMono = j.likeStore.Load(ctx, id)

		return await.All(messageMono, likeMono)
	}, func() (await.Group, error) {
		msg, err := messageMono.Get()
		if err != nil {
			return f.Error(errors.New("jot_not_found\n[messageId] " + id.String()))
		}

		jot = messageToJot(msg)
		if likable, err := likeMono.Get(); err == nil {
			jot.Likes = likable.Likes
		}

		userMono = j.userStore.Load(ctx, msg.UserID)
		return await.All(userMono)
	}, func() (await.Group, error) {
		user, err := userMono.Get()
		if err == nil {
			jot.Handle = user.Handle
		}

		return f.Success(jot)
	}).Mono()
}

func (j *JotsImpl) DeleteJot(ctx context.Context, id uuid.UUID) mono.Mono[Jot] {
	var (
		f           = flow.New[Jot]()
		messageMono mono.Mono[message.Message]
		likeMono    mono.Mono[like.Likable]
	)

	return f.Steps(func() (await.Group, error) {
		// Concurrently fetch the message and likable.
		messageMono = j.messageStore.Delete(ctx, id)
		likeMono = j.likeStore.Delete(ctx, id)

		return await.All(messageMono, likeMono)
	}, func() (await.Group, error) {
		msg, err := messageMono.Get()
		if err != nil {
			return f.Error(errors.New("jot_not_found\n[messageId] " + id.String()))
		}

		jot := messageToJot(msg)
		if likable, err := likeMono.Get(); err == nil {
			jot.Likes = likable.Likes
		}

		return f.Success(jot)
	}).Mono()
}

func (j *JotsImpl) Like(ctx context.Context, id uuid.UUID) mono.Void {
	return j.likeStore.Like(ctx, id)
}

func (j *JotsImpl) Unlike(ctx context.Context, id uuid.UUID) mono.Void {
	return j.likeStore.Unlike(ctx, id)
}

func (j *JotsImpl) Likes(ctx context.Context, id uuid.UUID, pagination *Pagination) mono.Mono[UserPage] {
	var (
		f        = flow.New[UserPage]()
		users    = make([]User, 0, pagination.Limit)
		ids      = make([]uuid.UUID, 0, pagination.Limit)
		lookup   = make(map[uuid.UUID]int)
		likeRefs flux.Flux[like.LikeRef]
		page     = UserPage{
			Offset: pagination.Offset,
			Limit:  pagination.Limit,
		}
	)

	return f.Steps(func() (await.Group, error) {
		likeRefs = j.likeStore.GetLikedBy(ctx, id, pagination.Offset, pagination.Limit)
		likeRefs.Subscribe(flux.Subscribe[like.LikeRef]{
			OnNext: func(ref like.LikeRef) {
				lookup[ref.UserID] = len(ids)
				ids = append(ids, ref.UserID)
				users = append(users, User{
					ID: ref.UserID,
				})
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})
		return await.All(likeRefs)
	}, func() (await.Group, error) {
		page.Items = users
		if len(ids) == 0 {
			return f.Success(page)
		}

		// Concurrently fetch the user info and followers.

		multiUsers := j.userStore.GetMultiple(ctx, ids)
		multiUsers.Subscribe(flux.Subscribe[user.User]{
			OnNext: func(u user.User) {
				if index, ok := lookup[u.ID]; ok {
					ref := &users[index]
					ref.Handle = u.Handle
				}
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})

		multiFollowers := j.followStore.GetMultiple(ctx, ids)
		multiFollowers.Subscribe(flux.Subscribe[follow.UserRef]{
			OnNext: func(f follow.UserRef) {
				if index, ok := lookup[f.ID]; ok {
					ref := &users[index]
					ref.Followers = f.Followers
					ref.Follows = f.Follows
				}
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})

		return await.All(multiUsers, multiFollowers)
	}, func() (await.Group, error) {
		return f.Success(page)
	}).Mono()
}

func messageToJot(msg message.Message) Jot {
	return Jot{
		ID:      msg.ID,
		UserID:  msg.UserID,
		Message: msg.Message,
		Time:    msg.Time,
		Likes:   0,
	}
}
