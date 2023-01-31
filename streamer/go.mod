module github.com/nanobus/examples/streamer

go 1.19

require (
	github.com/google/uuid v1.3.0
	github.com/nanobus/iota/go v0.0.0-20230131160247-771c6f23bc8d
)

require golang.org/x/exp v0.0.0-20221230185412-738e83a70c30 // indirect

replace github.com/google/uuid v1.3.0 => github.com/nanobus/iota/go/types/uuid v0.0.0-20230131160247-771c6f23bc8d
