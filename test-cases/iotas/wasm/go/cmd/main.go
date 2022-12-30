package main

import (
	"github.com/nanobus/iota/go/transport/wasmrs/guest"

	"github.com/nanobus/examples/test-suite/iotas/wasm/go/pkg/sample"
)

func main() {
	sample.Initialize(guest.HostInvoker)

	// Create providers

	// Create services
	sampleService := sample.NewSample()

	// Register services
	sample.Registertest(sampleService)
}
