// Code generated by @apexlang/codegen. DO NOT EDIT.

package urlshortener

import (
	"context"

	"github.com/nanobus/iota/go/rx/mono"
)

// The URL shortening service.
type Shortener interface {
	// Shorten a URL and return a generated identifier.
	Shorten(ctx context.Context, url string) mono.Mono[URL]
}

// Repository handles loading and storing shortened URLs.
type Repository interface {
	// Load the URL by its identifier.
	LoadByID(ctx context.Context, id string) mono.Mono[URL]
	// Load the ID by its URL.
	LoadByURL(ctx context.Context, url string) mono.Mono[URL]
	// Store a URL and its identifier.
	StoreURL(ctx context.Context, url *URL) mono.Void
}

// URL encapsulates the dynamic identifier and the URL it points to.
type URL struct {
	// The dynamically generated URL identifier.
	ID string `json:"id" yaml:"id" msgpack:"id"`
	// The original URL that was shortened.
	URL string `json:"url" yaml:"url" msgpack:"url"`
}

// DefaultURL returns a `URL` struct populated with its default values.
func DefaultURL() URL {
	return URL{}
}
