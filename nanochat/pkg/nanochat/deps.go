package nanochat

import (
	"github.com/nanobus/examples/nanochat/pkg/imports/follow"
	"github.com/nanobus/examples/nanochat/pkg/imports/like"
	"github.com/nanobus/examples/nanochat/pkg/imports/message"
	"github.com/nanobus/examples/nanochat/pkg/imports/user"
)

type Dependencies struct {
	MessageStore message.MessageStore
	UserStore    user.UserStore
	FollowStore  follow.FollowStore
	LikeStore    like.LikeStore
}
