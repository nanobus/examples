package main

import (
	"github.com/nanobus/iota/go/transport/wasmrs/guest"

	"github.com/nanobus/examples/urlshortener/pkg/urlshortener"
)

func main() {
	// Create providers
	deps := urlshortener.GetDependencies(guest.HostInvoker)

	// Create services
	shortenerService := urlshortener.NewShortener(deps)

	// Register services
	urlshortener.RegisterShortener(shortenerService)
}
