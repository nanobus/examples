# NanoChat

A basic social media messaging application that lets you send "Jots" to a public feed.

## Setup

Dependencies:

* Install [Go 1.19+](https://go.dev/dl/)
* Install [TinyGo 0.26+](https://tinygo.org/getting-started/install/)
* Install [Binaryen](https://github.com/WebAssembly/binaryen) (Homebrew `brew install binaryen`)
* Install [Apex and NanoBus](https://github.com/nanobus/nanobus/blob/main/README.md#getting-started).

## Running

Postgres and Jaeger in Docker

```cli
docker-compose -f docker/docker-compose.all.yml up
```

Create database for each IOta

```cli
./create_databases.sh
```

The databases can be dropped with `./drop_databases.sh` to reset everything.

Build the "Jot" IOta.

```cli
cd iotas/jot
just build
cd -
```

Run NanoBus from this directory

 ```cli
nanobus
```

If all goes well you should see logs like this.

```
✗ nanobus
2022-10-30T22:47:45.192-0400	INFO	Importing config	{"config": "iotas/jot/bus.yaml"}
2022-10-30T22:47:45.193-0400	INFO	Importing config	{"config": "iotas/follow/bus.yaml"}
2022-10-30T22:47:45.193-0400	INFO	Importing config	{"config": "iotas/like/bus.yaml"}
2022-10-30T22:47:45.193-0400	INFO	Importing config	{"config": "iotas/message/bus.yaml"}
2022-10-30T22:47:45.193-0400	INFO	Importing config	{"config": "iotas/user/bus.yaml"}
2022-10-30T22:47:45.198-0400	INFO	Migrating database	{"name": "followdb"}
2022-10-30T22:47:45.746-0400	INFO	Migration successful	{"name": "followdb"}
2022-10-30T22:47:45.746-0400	INFO	Migrating database	{"name": "likedb"}
2022-10-30T22:47:46.244-0400	INFO	Migration successful	{"name": "likedb"}
2022-10-30T22:47:46.244-0400	INFO	Migrating database	{"name": "messagedb"}
2022-10-30T22:47:46.790-0400	INFO	Migration successful	{"name": "messagedb"}
2022-10-30T22:47:46.790-0400	INFO	Migrating database	{"name": "userdb"}
2022-10-30T22:47:47.396-0400	INFO	Migration successful	{"name": "userdb"}
2022-10-30T22:47:47.396-0400	INFO	Initializing resource	{"name": "userdb"}
2022-10-30T22:47:47.428-0400	INFO	Initializing resource	{"name": "followdb"}
2022-10-30T22:47:47.452-0400	INFO	Initializing resource	{"name": "likedb"}
2022-10-30T22:47:47.474-0400	INFO	Initializing resource	{"name": "messagedb"}
2022-10-30T22:47:47.584-0400	INFO	Using JWKS URL for JWT verification
2022-10-30T22:47:48.060-0400	INFO	Initializing transport	{"name": "rest"}
2022-10-30T22:47:48.061-0400	INFO	Swagger UI	{"url": "http://localhost:8080/swagger/"}
2022-10-30T22:47:48.061-0400	INFO	Swagger Spec	{"url": "http://localhost:8080/swagger/swagger_spec"}
2022-10-30T22:47:48.067-0400	INFO	Postman collection	{"url": "http://localhost:8080/postman/collection"}
2022-10-30T22:47:48.068-0400	INFO	VS Code REST Client	{"url": "http://localhost:8080/rest-client/service.http"}
2022-10-30T22:47:48.068-0400	INFO	Registering REST handler	{"methods": ["POST"], "path": "/v1/jots"}
2022-10-30T22:47:48.068-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/jots"}
2022-10-30T22:47:48.068-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/jots/{id}"}
2022-10-30T22:47:48.068-0400	INFO	Registering REST handler	{"methods": ["DELETE"], "path": "/v1/jots/{id}"}
2022-10-30T22:47:48.068-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/jots/{id}/like"}
2022-10-30T22:47:48.068-0400	INFO	Registering REST handler	{"methods": ["DELETE"], "path": "/v1/jots/{id}/like"}
2022-10-30T22:47:48.068-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/jots/{id}/likes"}
2022-10-30T22:47:48.069-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/users/{handle}"}
2022-10-30T22:47:48.069-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/users/{handle}/jots"}
2022-10-30T22:47:48.069-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/users/{handle}/follow"}
2022-10-30T22:47:48.069-0400	INFO	Registering REST handler	{"methods": ["DELETE"], "path": "/v1/users/{handle}/follow"}
2022-10-30T22:47:48.069-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/users/{handle}/follows"}
2022-10-30T22:47:48.069-0400	INFO	Registering REST handler	{"methods": ["GET"], "path": "/v1/users/{handle}/followers"}
2022-10-30T22:47:48.069-0400	INFO	Serving static files	{"dir": "ui", "path": "/", "strip": ""}
2022-10-30T22:47:48.069-0400	INFO	Initializing transport	{"name": "httprpc"}
2022-10-30T22:47:48.069-0400	INFO	REST server listening	{"address": ":8080"}
2022-10-30T22:47:48.070-0400	INFO	HTTP RPC server listening	{"address": ":9090"}
```

You can use Swagger UI or Postman to try the API. Many of the endpoints require OAuth to know who the user is.
