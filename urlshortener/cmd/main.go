package main

import (
	"github.com/nanobus/iota/go/transport/wasmrs/guest"

	"github.com/nanobus/examples/urlshortener/pkg/urlshortener"
)

func main() {
	urlshortener.Initialize(guest.HostInvoker)

	// Create providers
	repositoryProvider := urlshortener.NewRepository()

	// Create services
	shortenerService := urlshortener.NewShortener(repositoryProvider)

	// Register services
	urlshortener.RegisterShortener(shortenerService)
}
