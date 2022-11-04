# nanochat

## See it in action
Build:
`docker run -v $(PWD):/opt/project/src/app -ti candlecorp/iota-builder:v8 'just'`
run:
`docker-compose --profile app up `
visit: http://localhost:8080

Login:
```
u: foo@candle.dev
p: bar
```

## Repository

| Path                | Description                        |
| :------------------ | :--------------------------------- |
| bus.yaml            | [Nanobus] nanochat configuration   |
| iotas/jot           | jot API [iOTA]                     |
| iotas/jot/apex.aidl | [apexlang.io] jot [AIDL]           |
| iotas/jot/apex.yaml | [apexlang.io] jot configuration    |
| iotas/jot/bus.yaml  | [Nanobus] nano API configuration   |
| ops                 | Operational utils including Docker |
| sql                 | Database schema (Postgres)         |
| tests               | Integration Tests                  |
| tests/data          | Integration Test data              |
| ui                  | Web Static HTML & JS               |

## Locations

| Default URL                                                 | Description                      |
| :---------------------------------------------------------- | :------------------------------- |
| http://localhost:8080                                       | Nanobus Web Interface            |
| http://localhost:9000                                       | OpenID Connect                   |
| postgresql://postgres:postgres@localhost:5432/iota_follow  | [PostgreSQL Database] Connection |
| postgresql://postgres:postgres@localhost:5432/iota_like    | [PostgreSQL Database] Connection |
| postgresql://postgres:postgres@localhost:5432/iota_message | [PostgreSQL Database] Connection |
| postgresql://postgres:postgres@localhost:5432/iota_user    | [PostgreSQL Database] Connection |

## Dependencies

To setup a local development environment

| Dependency             | Min. Version | Check             | Description                                                |
| :--------------------- | :----------- | :---------------- | :--------------------------------------------------------- |
| [apex] [^1]            | v0.1.16      | $ apex version    | [apexlang.io] Code generation                              |
| [go] [^1]              | go1.19.2[^2] | $ go version      | Building Go [iOTAs]                                        |
| [rust] [^1]            | Stable-2[^2] | $ rustup show     | Building Rust [iOTAs]                                      |
| [npm] [^1]             | 8.11.0[^2]   | $ npm --version   | [apexlang.io] dependency                                   |
| [npx] [^1]             | 8.11.0[^2]   | $ npx --version   | [apexlang.io] dependency                                   |
| [nanobus] [^1]         | 0.0.2        | $ nanobus version | [Nanobus](https://github.com/nanobus/nanobus) to run iOTAs |
| [postgres] server [^3] | 12.00[^2]    | $ psql --version  | [PostgreSQL Database] server                               |
| [just] [^1]            | 1.5.0[^2]    | $ just --version  | Like Makefile [just] runs the needed commands              |

Optionally you may want to use docker

| Dependency       | Min. Version | Check                    | Description                            |
| :--------------- | :----------- | :----------------------- | :------------------------------------- |
| [docker]         | 20.10.17[^2] | $ docker version         | Build and run via Docker containers    |
| [docker-compose] | v2.12.2[^2]  | $ docker compose version | Docker compose nanobus & postgres [^3] |

## Install the iOTA Code generator

The iOTA Code generator is used to generate the required boilerplate

$ `cd ~/iota/codegen`

~/nanochat/iota/codegen $ `just install`

~/nanochat/iota/codegen $ `just apex-install`

## Build the jot iOTA

For an example we can build the jot iota

$ `cd ~/nanochat/iotas/jot`

Generate the iOTA source code

iotas/jot $ `apex generate`

Build the Rust in Docker

iotas/jot $ `docker run -v $(pwd):/opt/project/src/app -ti candlecorp/iota-builder:v3 just rust`

Build the generated Rust locally with Just

iotas/jot $ `just rust`

## Docker Everything

The full-stack docker compose:

$ `docker compose up`

Provides all the running parts;

- Postgres - Postgres running in the standard 5842 port
- Jaeger - Distributed tracing system. Navigate to [http://localhost:16686](http://localhost:16686) at access the Jaeger UI.
- NanoBus - The nanobus back-end
- qlik/simple-oidc-provider - Simple OIDC provider for User authentication and local develment

## Run Separately

PostgreSQL server via Docker or provide your own

$ `docker compose up postgres`

OpenID Connect via Docker or provide your own

$ `docker compose up oidc`

Run nanobus either via Docker

$ `docker compose up nanobus`

Or run nanobus in local host manually

$

```
nanobus
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

[apex]: https://apexlang.io/docs/getting-started
[apexlang.io]: https://apexlang.io
[docker]: https://docs.docker.com/engine/install/
[docker-compose]: https://docs.docker.com/compose/install/
[go]: https://go.dev/doc/install
[iota]: https://github.com/nanobus/iOTA
[iotas]: https://github.com/nanobus/iOTA
[just]: https://github.com/casey/just#Installation
[nanobus]: https://github.com/nanobus/nanobus#Install
[npm]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
[npx]: https://www.npmjs.com/package/npx#Install
[postgres]: https://www.postgresql.org/download/
[postgresql database]: https://www.postgresql.org/
[rust]: https://rustup.rs/

[^1]: Building the iotas can be done either via docker or development tools installed in host
[^2]: Earlier versions to provided minimum(s) may work but these are not tested
[^3]: Server dependencies be optionally via docker or in host - see docker-compose.yaml
