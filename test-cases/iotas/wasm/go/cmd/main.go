package main

import (
	"github.com/nanobus/iota/go/transport/wasmrs/guest"

	"github.com/nanobus/examples/test-cases/iotas/wasm/go/pkg/sample"
)

func main() {
	sample.Initialize(guest.HostInvoker)

	// Create providers
	externalProvider := sample.NewExternal()

	// Create services
	testService := sample.NewTest(externalProvider)

	// Register services
	sample.RegisterTest(testService)
}
