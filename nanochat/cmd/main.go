package main

import (
	"github.com/nanobus/iota/go/wasmrs/guest"

	"github.com/nanobus/examples/nanochat/pkg/imports/follow"
	"github.com/nanobus/examples/nanochat/pkg/imports/like"
	"github.com/nanobus/examples/nanochat/pkg/imports/message"
	"github.com/nanobus/examples/nanochat/pkg/imports/user"
	"github.com/nanobus/examples/nanochat/pkg/nanochat"
)

func main() {
	nanochat.Initialize(guest.HostInvoker)
	message.Initialize(guest.HostInvoker)
	user.Initialize(guest.HostInvoker)
	like.Initialize(guest.HostInvoker)
	follow.Initialize(guest.HostInvoker)

	// Create dependencies
	deps := nanochat.Dependencies{
		MessageStore: message.NewMessageStore(),
		FollowStore:  follow.NewFollowStore(),
		UserStore:    user.NewUserStore(),
		LikeStore:    like.NewLikeStore(),
	}

	// Create services
	jotsService := nanochat.NewJots(&deps)
	usersService := nanochat.NewUsers(&deps)

	// Register services
	nanochat.RegisterJots(jotsService)
	nanochat.RegisterUsers(usersService)
}
