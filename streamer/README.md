# Streamer

A streaming example that streams records from a Postgres table/query and writes in JSON format them to a BLOB.

## Setup

Dependencies:

* Install [Docker](https://docs.docker.com/get-docker/)
* Install [Deno](https://github.com/denoland/deno_install)
* Install [Apex](https://apexlang.io)
* Install [NanoBus](https://github.com/nanobus/nanobus/blob/main/README.md#getting-started)
* Install [Go 1.19+](https://go.dev/doc/install)
* Install [TinyGo 0.26+](https://tinygo.org/getting-started/install/)

## Running

### Start Postgres and Jaeger inside Docker

```cli
docker-compose up
```

### Build the application

```cli
apex build
```

### Option 1: Run NanoBus as a server

 ```cli
nanobus run --debug
```

Invoke via HTTP

```cli
curl -L -X POST 'http://localhost:8080/process' \
-H 'Content-Type: application/json' \
--data-raw '{}'
```

### Option 2: Invoke in the terminal

```cli
echo '{}' | nanobus invoke --developer-mode bus.ts streamer.v1.Streamer::process
```
