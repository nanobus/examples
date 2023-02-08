package main

import (
	"github.com/nanobus/iota/go/transport/wasmrs/guest"

	"github.com/nanobus/examples/streamer/pkg/streamer"
)

func main() {
	streamer.Initialize(guest.HostInvoker)

	// Create providers
	sourceProvider := streamer.NewSource()
	sinkProvider := streamer.NewSink()

	// Create services
	streamerService := streamer.NewStreamer(sourceProvider, sinkProvider)

	// Register services
	streamer.RegisterStreamer(streamerService)
}
