package main

import (
	"github.com/nanobus/iota/go/wasmrs/guest"

	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/follow"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/jot"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/like"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/message"
	"github.com/nanobus/examples/nanochat/iotas/jot/pkg/user"
)

func main() {
	jot.Initialize(guest.HostInvoker)
	message.Initialize(guest.HostInvoker)
	user.Initialize(guest.HostInvoker)
	like.Initialize(guest.HostInvoker)
	follow.Initialize(guest.HostInvoker)

	// Create dependencies
	deps := jot.Dependencies{
		MessageStore: message.NewMessageStore(),
		FollowStore:  follow.NewFollowStore(),
		UserStore:    user.NewUserStore(),
		LikeStore:    like.NewLikeStore(),
	}

	// Create services
	jotsService := jot.NewJots(&deps)
	usersService := jot.NewUsers(&deps)

	// Register services
	jot.RegisterJots(jotsService)
	jot.RegisterUsers(usersService)
}
