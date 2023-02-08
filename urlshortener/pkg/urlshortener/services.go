package urlshortener

import (
	"context"
	"math/rand"
	"strings"
	"time"

	"github.com/nanobus/iota/go/rx/await"
	"github.com/nanobus/iota/go/rx/flow"
	"github.com/nanobus/iota/go/rx/mono"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

type ShortenerImpl struct {
	repository Repository
}

// Ensure ShortenerImpl satifies the Shortener interface.
var _ = (Shortener)((*ShortenerImpl)(nil))

func NewShortener(deps Dependencies) *ShortenerImpl {
	return &ShortenerImpl{
		repository: deps.Repository,
	}
}

func (s *ShortenerImpl) Shorten(ctx context.Context, url string) mono.Mono[URL] {
	var (
		f         = flow.New[URL]()
		loadByURL mono.Mono[URL]
		storeURL  mono.Void
		u         URL
	)

	return f.Steps(func() (await.Group, error) {
		loadByURL = s.repository.LoadByURL(ctx, url)
		return await.All(loadByURL)
	}, func() (await.Group, error) {
		if urlResp, err := loadByURL.Get(); err != nil {
			msg := err.Error()
			if !strings.Contains(msg, "not_found") {
				f.Error(err)
				return f.End()
			}
		} else {
			f.Success(urlResp)
			return f.End()
		}

		u = URL{
			ID:  generateID(8),
			URL: url,
		}

		storeURL = s.repository.StoreURL(ctx, &u)
		return await.All(storeURL)
	}, func() (await.Group, error) {
		_, err := storeURL.Get()
		if err != nil {
			return f.Error(err)
		}

		return f.Success(u)
	}).Mono()
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func generateID(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
