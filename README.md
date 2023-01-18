# NanoBus examples

* [Basic no-code interface](./nocode-invocation/) - A bare-bones example of how to deliver functionality with no code.
* [Basic web service](./basic-web-service/) - An example of how to turn any nanobus interface into a web service.
* [WebAssembly-powered web service](./wasm-web-service/) - An example of using WebAssembly modules as HTTP handlers.
* [Dapr integration](./dapr) - A CRUD and eventing example using Dapr's [State Store](https://docs.dapr.io/developing-applications/building-blocks/state-management/state-management-overview/) and [PubSub](https://docs.dapr.io/developing-applications/building-blocks/pubsub/pubsub-overview/) APIs.
* [Blog](./blog/) - A simple blog implementation on NanoBus.
* [Scheduler](./scheduler/) - An example of using the scheduler transport for cron-like functionality.
* [URL Shortener](./urlshortener/) - An API that shortens URLs and showcases practical use of [Postgres](https://www.postgresql.org), [Jaeger](https://www.jaegertracing.io) and [OAuth](https://oauth.net)/[ODIC](https://openid.net/connect/)/[JWT](https://jwt.io).
* [NanoChat](./nanochat/) - A simple messaging platform that uses multiple Iotas to compose a larger application. The WasmRS protocol enables the application to stream data from the database and perform asynchronous tasks.

## Running tests

These examples are also used as tests for `nanobus` to ensure compatibility.

Tests are kicked off with [just](https://crates.io/crates/just), which uses [cram](https://github.com/myint/cram#installation).
Make sure both of these are installed, first.

Then, run tests like this:
```sh
$ just test
```

## Building tests

Building test artifacts requires the following tools. Make sure they are installed, first.
* [just](https://crates.io/crates/just)
* [apex](https://github.com/apexlang/apex#installation)
* [tinygo](https://tinygo.org/getting-started/install/)
* [wasm-opt](https://www.npmjs.com/package/wasm-opt)
* [cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

Then, rebuild test artifacts like this:
```sh
$ just build
```
