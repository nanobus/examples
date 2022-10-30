package jot

import (
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/follow"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/like"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/message"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/user"
)

type Dependencies struct {
	MessageStore message.MessageStore
	UserStore    user.UserStore
	FollowStore  follow.FollowStore
	LikeStore    like.LikeStore
}
