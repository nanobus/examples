package nanochat

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/nanobus/iota/go/rx/await"
	"github.com/nanobus/iota/go/rx/flow"
	"github.com/nanobus/iota/go/rx/flux"
	"github.com/nanobus/iota/go/rx/mono"

	"github.com/nanobus/examples/nanochat/pkg/imports/follow"
	"github.com/nanobus/examples/nanochat/pkg/imports/like"
	"github.com/nanobus/examples/nanochat/pkg/imports/message"
	"github.com/nanobus/examples/nanochat/pkg/imports/user"
)

type UsersImpl struct {
	messageStore message.MessageStore
	userStore    user.UserStore
	followStore  follow.FollowStore
	likeStore    like.LikeStore
}

var _ = (Users)((*UsersImpl)(nil))

func NewUsers(deps *Dependencies) *UsersImpl {
	return &UsersImpl{
		messageStore: deps.MessageStore,
		userStore:    deps.UserStore,
		followStore:  deps.FollowStore,
		likeStore:    deps.LikeStore,
	}
}

func (u *UsersImpl) Me(ctx context.Context) mono.Mono[User] {
	var (
		f             = flow.New[User]()
		userMono      mono.Mono[user.User]
		userResult    user.User
		followMono    mono.Mono[follow.UserRef]
		followingMono mono.Mono[bool]
	)

	return f.Steps(func() (await.Group, error) {
		userMono = u.userStore.Me(ctx)
		return await.All(userMono)
	}, func() (await.Group, error) {
		var err error
		userResult, err = userMono.Get()
		if err != nil {
			return f.Error(errors.New("user_not_found\n[handle] me"))
		}

		followMono = u.followStore.Load(ctx, userResult.ID)
		followingMono = u.followStore.IsFollowing(ctx, userResult.ID)
		return await.All(followMono, followingMono)
	}, func() (await.Group, error) {
		var followers uint32
		var follows uint32

		if ref, err := followMono.Get(); err == nil {
			followers = ref.Followers
			follows = ref.Follows
		}
		isFollowing, _ := followingMono.Get()

		return f.Success(User{
			ID:          userResult.ID,
			Handle:      userResult.Handle,
			Followers:   followers,
			Follows:     follows,
			IsFollowing: isFollowing,
		})
	}).Mono()
}

func (u *UsersImpl) GetProfile(ctx context.Context, handle string) mono.Mono[User] {
	var (
		f             = flow.New[User]()
		userMono      mono.Mono[user.User]
		userResult    user.User
		followMono    mono.Mono[follow.UserRef]
		followingMono mono.Mono[bool]
	)

	return f.Steps(func() (await.Group, error) {
		userMono = u.userStore.FindByHandle(ctx, handle)
		return await.All(userMono)
	}, func() (await.Group, error) {
		var err error
		userResult, err = userMono.Get()
		if err != nil {
			return f.Error(errors.New("user_not_found\n[handle] " + handle))
		}

		followMono = u.followStore.Load(ctx, userResult.ID)
		followingMono = u.followStore.IsFollowing(ctx, userResult.ID)
		return await.All(followMono, followingMono)
	}, func() (await.Group, error) {
		var followers uint32
		var follows uint32

		if ref, err := followMono.Get(); err == nil {
			followers = ref.Followers
			follows = ref.Follows
		}
		isFollowing, _ := followingMono.Get()

		return f.Success(User{
			ID:          userResult.ID,
			Handle:      userResult.Handle,
			Followers:   followers,
			Follows:     follows,
			IsFollowing: isFollowing,
		})
	}).Mono()
}

func (u *UsersImpl) GetJots(ctx context.Context, handle string, before *time.Time, limit uint32) mono.Mono[JotPage] {
	var (
		f            = flow.New[JotPage]()
		userMono     mono.Mono[user.User]
		userResult   user.User
		jots         = make([]Jot, 0, limit)
		ids          = make([]uuid.UUID, 0, limit)
		lookup       = make(map[uuid.UUID]int)
		messagesFlux flux.Flux[message.Message]
		page         = JotPage{
			Before: before,
			Limit:  limit,
		}
	)

	return f.Steps(func() (await.Group, error) {
		userMono = u.userStore.FindByHandle(ctx, handle)
		return await.All(userMono)
	}, func() (await.Group, error) {
		var err error
		userResult, err = userMono.Get()
		if err != nil {
			return f.Error(errors.New("user_not_found\n[handle] " + handle))
		}

		messagesFlux = u.messageStore.GetUserMessages(ctx, userResult.ID, before, limit)
		messagesFlux.Subscribe(flux.Subscribe[message.Message]{
			OnNext: func(msg message.Message) {
				lookup[msg.ID] = len(jots)
				jot := messageToJot(msg)
				jot.Handle = userResult.Handle
				ids = append(ids, jot.ID)
				jots = append(jots, jot)
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})

		return await.All(messagesFlux)
	}, func() (await.Group, error) {
		page.Items = jots
		if len(ids) == 0 {
			return f.Success(page)
		}

		multipleLikes := u.likeStore.GetMultiple(ctx, ids)
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

		return await.All(multipleLikes)
	}, func() (await.Group, error) {
		return f.Success(page)
	}).Mono()
}

func (u *UsersImpl) Follow(ctx context.Context, handle string) mono.Void {
	return mono.Create(func(sink mono.Sink[struct{}]) {
		u.userStore.FindByHandle(ctx, handle).Subscribe(mono.Subscribe[user.User]{
			OnSuccess: func(user user.User) {
				u.followStore.Follow(ctx, user.ID).Subscribe(mono.Subscribe[struct{}]{
					OnSuccess: func(s struct{}) {
						sink.Success(struct{}{})
					},
					OnError: sink.Error,
				})
			},
			OnError: sink.Error,
		})
	})
}

func (u *UsersImpl) Unfollow(ctx context.Context, handle string) mono.Void {
	return mono.Create(func(sink mono.Sink[struct{}]) {
		u.userStore.FindByHandle(ctx, handle).Subscribe(mono.Subscribe[user.User]{
			OnSuccess: func(user user.User) {
				u.followStore.Unfollow(ctx, user.ID).Subscribe(mono.Subscribe[struct{}]{
					OnSuccess: func(s struct{}) {
						sink.Success(struct{}{})
					},
					OnError: sink.Error,
				})
			},
			OnError: sink.Error,
		})
	})
}

func (u *UsersImpl) GetFollows(ctx context.Context, handle string, pagination *Pagination) mono.Mono[UserPage] {
	var (
		f          = flow.New[UserPage]()
		userMono   mono.Mono[user.User]
		userResult user.User
		users      = make([]User, 0, pagination.Limit)
		ids        = make([]uuid.UUID, 0, pagination.Limit)
		lookup     = make(map[uuid.UUID]int)
		page       = UserPage{
			Offset: pagination.Offset,
			Limit:  pagination.Limit,
		}
	)

	return f.Steps(func() (await.Group, error) {
		userMono = u.userStore.FindByHandle(ctx, handle)
		return await.All(userMono)
	}, func() (await.Group, error) {
		var err error
		userResult, err = userMono.Get()
		if err != nil {
			return f.Error(errors.New("user_not_found\n[handle] " + handle))
		}
		follows := u.followStore.FetchFollows(ctx,
			userResult.ID,
			pagination.Offset,
			pagination.Limit).Subscribe(flux.Subscribe[follow.FollowRef]{
			OnNext: func(f follow.FollowRef) {
				lookup[f.ID] = len(ids)
				ids = append(ids, f.ID)
				users = append(users, User{
					ID: f.ID,
				})
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})
		return await.All(follows)
	}, func() (await.Group, error) {
		page.Items = users
		if len(ids) == 0 {
			return f.Success(page)
		}

		// Concurrently fetch the user info and followers.

		multiUsers := u.userStore.GetMultiple(ctx, ids)
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

		multiFollowers := u.followStore.GetMultiple(ctx, ids)
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

func (u *UsersImpl) GetFollowers(ctx context.Context, handle string, pagination *Pagination) mono.Mono[UserPage] {
	var (
		f          = flow.New[UserPage]()
		userMono   mono.Mono[user.User]
		userResult user.User
		users      = make([]User, 0, pagination.Limit)
		ids        = make([]uuid.UUID, 0, pagination.Limit)
		lookup     = make(map[uuid.UUID]int)
		page       = UserPage{
			Offset: pagination.Offset,
			Limit:  pagination.Limit,
		}
	)

	return f.Steps(func() (await.Group, error) {
		userMono = u.userStore.FindByHandle(ctx, handle)
		return await.All(userMono)
	}, func() (await.Group, error) {
		var err error
		userResult, err = userMono.Get()
		if err != nil {
			return f.Error(errors.New("user_not_found\n[handle] " + handle))
		}
		follows := u.followStore.FetchFollowers(ctx,
			userResult.ID,
			pagination.Offset,
			pagination.Limit).Subscribe(flux.Subscribe[follow.FollowRef]{
			OnNext: func(f follow.FollowRef) {
				lookup[f.ID] = len(ids)
				ids = append(ids, f.ID)
				users = append(users, User{
					ID: f.ID,
				})
			},
			OnError: func(err error) {
				f.Error(err)
			},
		})
		return await.All(follows)
	}, func() (await.Group, error) {
		page.Items = users
		if len(ids) == 0 {
			return f.Success(page)
		}

		// Concurrently fetch the user info and followers.

		multiUsers := u.userStore.GetMultiple(ctx, ids)
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

		multiFollowers := u.followStore.GetMultiple(ctx, ids)
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
