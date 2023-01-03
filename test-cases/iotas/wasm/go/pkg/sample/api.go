package sample

import (
	"context"

	"github.com/nanobus/iota/go/rx/mono"
)

type SampleImpl struct {
}

func NewSample() *SampleImpl {
	return &SampleImpl{}
}

func Reverse(input string) (output string) {
	inputRunes := []rune(input)

	for i, j := 0, len(inputRunes)-1; i < j; i, j = i+1, j-1 {
		inputRunes[i], inputRunes[j] = inputRunes[j], inputRunes[i]
	}

	output = string(inputRunes)

	return
}

func (s *SampleImpl) Op(ctx context.Context) mono.Mono[string] {
	return mono.Just[string]("test")
}

func (s *SampleImpl) Reverse(ctx context.Context, input string) mono.Mono[string] {
	return mono.Just[string](Reverse(input))
}
