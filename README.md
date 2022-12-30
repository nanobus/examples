# NanoBus examples

* [URL Shortener](./urlshortener/) - An API that shortens URLs and showcases practical use of [Postgres](https://www.postgresql.org), [Redis](https://redis.com), [Kafka](https://kafka.apache.org), [CloudEvents](https://cloudevents.io), [Jaeger](https://www.jaegertracing.io) and [OAuth](https://oauth.net)/[ODIC](https://openid.net/connect/)/[JWT](https://jwt.io).
* [NanoChat](./nanochat/) - A simple messaging platform that uses multiple IOtas to compose a larger application. The WasmRS protocol enables the application to stream data from the database and perform asynchronous tasks.
* [Basic no-code interface](./nocode-invocation/) - A bare-bones example of how to deliver functionality with no code.
* [Basic web service](./basic-web-service/) - An example of how to turn any nanobus interface into a web service.
* [WebAssembly-powered web service](./wasm-web-service/) - An example of using WebAssembly modules as HTTP handlers.
* [Scheduler](./scheduler/) - An example of using the scheduler transport for cron-like functionality.

## Building and running tests

These examples are also used as tests for `nanobus` to ensure compatibility.

To rebuild test artifacts run:

```sh
$ just build
```

To run tests use the command:

```sh
$ just test
```