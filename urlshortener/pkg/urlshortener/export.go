// Code generated by @apexlang/codegen. DO NOT EDIT.

package urlshortener

import (
	"context"

	"github.com/nanobus/iota/go/invoke"
	"github.com/nanobus/iota/go/payload"
	"github.com/nanobus/iota/go/rx/mono"
	"github.com/nanobus/iota/go/transform"
)

func RegisterShortener(svc Shortener) {
	invoke.ExportRequestResponse("urlshortener.v1.Shortener", "shorten", shortenerShortenWrapper(svc))
}

func shortenerShortenWrapper(svc Shortener) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		var inputArgs ShortenerShortenArgs
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.Shorten(ctx, inputArgs.URL)
		return mono.Map(response, transform.MsgPackEncode[URL])
	}
}