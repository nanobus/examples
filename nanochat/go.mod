module github.com/nanobus/examples/nanochat

go 1.19

replace github.com/google/uuid v1.3.0 => github.com/nanobus/iota/go/types/uuid v0.0.0-20221030002516-67c7602f3f87

require (
	github.com/google/uuid v1.3.0
	github.com/nanobus/iota/go v0.0.0-20230116224750-7d9fb56e8751
)

require golang.org/x/exp v0.0.0-20221230185412-738e83a70c30 // indirect
