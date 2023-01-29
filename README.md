# NanoBus examples

* [Basic no-code interface](./nocode-invocation/) - A bare-bones example of how to deliver functionality with no code.
* [Basic web service](./basic-web-service/) - An example of how to turn any nanobus interface into a web service.
* [WebAssembly-powered web service](./wasm-web-service/) - An example of using WebAssembly modules as HTTP handlers.
* [Dapr integration](./dapr) - A CRUD and eventing example using Dapr's [State Store](https://docs.dapr.io/developing-applications/building-blocks/state-management/state-management-overview/) and [PubSub](https://docs.dapr.io/developing-applications/building-blocks/pubsub/pubsub-overview/) APIs.
* [Blog](./blog/) - A simple blog implementation on NanoBus.
* [Scheduler](./scheduler/) - An example of using the scheduler transport for cron-like functionality.
* [URL Shortener](./urlshortener/) - An API that shortens URLs and showcases practical use of [Postgres](https://www.postgresql.org), [Jaeger](https://www.jaegertracing.io) and [OAuth](https://oauth.net)/[ODIC](https://openid.net/connect/)/[JWT](https://jwt.io).
* [NanoChat](./nanochat/) - A simple messaging platform that uses multiple Iotas to compose a larger application. The WasmRS protocol enables the application to stream data from the database and perform asynchronous tasks.
* [Streamer](./streamer/) - An example of using the WasmRS streams to write directly to a Blob store as records are being read from a database.
