# URL Shortener

A simple URL shortener API that stores shortened URLs in [Postgres](https://www.postgresql.org) and writes traces to [Jaeger](https://www.jaegertracing.io). Optionally, [OAuth](https://oauth.net)/[ODIC](https://openid.net/connect/)/[JWT](https://jwt.io) authorization can be enabled via configuration.

## Setup

Dependencies:

* Install [Deno](https://github.com/denoland/deno_install)
* Install [Apex](https://apexlang.io)
* Install [NanoBus](https://github.com/nanobus/nanobus/blob/main/README.md#getting-started)
* Install [Go 1.19+](https://go.dev/doc/install)
* Install [TinyGo 0.26+](https://tinygo.org/getting-started/install/)

## Running

Run Postgres and Jaeger inside Docker

```cli
cd docker
docker-compose -f docker-compose.all.yml up
```

Build the application

```cli
just build
```

Run NanoBus

 ```cli
just run
```
