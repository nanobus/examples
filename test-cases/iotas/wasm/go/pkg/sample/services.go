package sample

import (
	"context"

	"github.com/nanobus/iota/go/rx/mono"
)

type TestImpl struct {
	external External
}

func NewTest(external External) *TestImpl {
	return &TestImpl{
		external: external,
	}
}

func (t *TestImpl) Op(ctx context.Context) mono.Mono[string] {
	return mono.Just("test")
}

func (t *TestImpl) Reverse(ctx context.Context, input string) mono.Mono[string] {
	return mono.Just(Reverse(input))
}

func Reverse(input string) (output string) {
	inputRunes := []rune(input)

	for i, j := 0, len(inputRunes)-1; i < j; i, j = i+1, j-1 {
		inputRunes[i], inputRunes[j] = inputRunes[j], inputRunes[i]
	}

	output = string(inputRunes)

	return
}
