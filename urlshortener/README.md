# URL Shortener

A simple URL shortener API that stores them in a swappable database (e.g. [Postgres](https://www.postgresql.org) or [Redis](https://redis.com)) and publishes new URLs to [Kafka](https://kafka.apache.org) as [CloudEvents](https://cloudevents.io) and writes traces to [Jaeger](https://www.jaegertracing.io). Optionally, [OAuth](https://oauth.net)/[ODIC](https://openid.net/connect/)/[JWT](https://jwt.io) authorization can be enabled via configuration.

## Setup

Dependencies:

* Install [Go 1.19+](https://go.dev/dl/)
* Install [TinyGo 0.26+](https://tinygo.org/getting-started/install/)
* Install [Binaryen](https://github.com/WebAssembly/binaryen) (Homebrew `brew install binaryen`)
* Install [Apex and NanoBus](https://github.com/nanobus/nanobus/blob/main/README.md#getting-started).

## Running

Run Postgres, Redis and Kafka inside Docker

```cli
cd docker
docker-compose -f docker-compose.all.yml up
```

Run the Dapr Kakfa pluggable component (new terminal)

```cli
just kafka
```

Run the Dapr Redis pluggable component (new terminal)

```cli
just redis
```

Build the application

```cli
just build
```

Run NanoBus

 ```cli
just run
```
