// Code generated by @apexlang/codegen. DO NOT EDIT.

package sample

import (
	"context"
	"encoding/binary"

	"github.com/nanobus/iota/go/invoke"
	"github.com/nanobus/iota/go/msgpack"
	"github.com/nanobus/iota/go/payload"
	"github.com/nanobus/iota/go/proxy"
	"github.com/nanobus/iota/go/rx/mono"
	"github.com/nanobus/iota/go/transform"
)

var (
	gCaller invoke.Caller
)

func Initialize(caller invoke.Caller) {
	gCaller = caller
}

type externalImpl struct {
	opUppercase uint32
}

func Newexternal() *externalImpl {
	return &externalImpl{
		opUppercase: invoke.ImportRequestResponse("suite.external", "uppercase"),
	}
}

func (e *externalImpl) Uppercase(ctx context.Context, input string) mono.Mono[string] {
	request := ExternalUppercaseArgs{
		Input: input,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[string](err)
	}
	var metadata [8]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], e.opUppercase)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := gCaller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.String.Decode)
}
