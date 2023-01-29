package streamer

import (
	"context"

	"github.com/nanobus/iota/go/rx/flux"
	"github.com/nanobus/iota/go/rx/mono"
)

type StreamerImpl struct {
	source Source
	sink   Sink
}

func NewStreamer(source Source, sink Sink) *StreamerImpl {
	return &StreamerImpl{
		source: source,
		sink:   sink,
	}
}

func (s *StreamerImpl) Process(ctx context.Context) mono.Void {
	return mono.Create(func(sink mono.Sink[struct{}]) {
		p := flux.NewProcessor[Customer]()
		s.sink.Write(ctx, p).Subscribe(mono.Subscribe[struct{}]{})

		s.source.Read(ctx).Subscribe(flux.Subscribe[Customer]{
			OnNext: func(c Customer) {
				println(c.ID.String(), c.FirstName, c.LastName)
				p.Next(c)
			},
			OnError: func(err error) {
				p.Error(err)
				sink.Error(err)
			},
			OnComplete: func() {
				p.Complete()
				sink.Success(struct{}{})
			},
		})
	})
}
