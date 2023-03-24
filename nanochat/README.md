# nanochat 

## See it in action

### Install:

[nanobus]

### run:

For local db and auth

```sh
apex docker
```

It takes a few seconds for the OIDC provider to start and allow NanoBus to start successfully.

```sh
nanobus run --debug
```

Visit: http://localhost:8080

Login:

```
u: foo@nanochat.io
p: bar
```

## Dependencies

To setup a local development environment

| Dependency       | Check                    | Description                                                |
|:---------------- |:------------------------ |:---------------------------------------------------------- |
| [apex]           | $ apex --version         | Like Makefile [apex] runs the needed commands              |
| [nanobus]        | $ nanobus version        | [Nanobus](https://github.com/nanobus/nanobus) to run iOTAs |
| [docker]         | $ docker version         | Build and run via Docker containers                        |
| [docker-compose] | $ docker compose version | Docker compose nanobus & postgres                          |

## Developing the UI
run:

```sh
apex deps
apex dev
```

Open the UI in your browser: http://localhost:5173

When you are finished, make sure to run `docker compose down`.

## Docker Everything

The full-stack docker compose:

```sh
docker compose --profile app up
```

Provides all the running parts;

- Postgres - Postgres running in the standard 5842 port
- Jaeger - Distributed tracing system. Navigate to [http://localhost:16686](http://localhost:16686) at access the Jaeger UI.
- NanoBus - The nanobus back-end
- qlik/simple-oidc-provider - Simple OIDC provider for User authentication and local develment


[apex]: https://apexlang.io/docs/getting-started
[apexlang.io]: https://apexlang.io
[docker]: https://docs.docker.com/engine/install/
[docker-compose]: https://docs.docker.com/compose/install/
[go]: https://go.dev/doc/install
[iota]: https://github.com/nanobus/iota
[iotas]: https://github.com/nanobus/iota
[just]: https://github.com/casey/just#Installation
[nanobus]: https://github.com/nanobus/nanobus#Install
[npm]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
[npx]: https://www.npmjs.com/package/npx#Install
[postgres]: https://www.postgresql.org/download/
[postgresql database]: https://www.postgresql.org/
[rust]: https://rustup.rs/
