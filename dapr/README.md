# NanoBus + Dapr

Use NanoBus and Dapr together to simplify cloud application development.

### Prerequisites

Before you begin, make sure you have the following installed:

* [Deno](https://github.com/denoland/deno_install)
* [Apex](https://apexlang.io)
* [Docker](https://docs.docker.com/get-docker/) (required by Dapr)
* [Dapr](https://dapr.io)
* [NanoBus](https://github.com/nanobus/nanobus)

1) Clone the nanobus/examples directory

    ```
    git clone https://github.com/nanobus/examples.git
    cd examples/dapr
    ```

2) Run NanoBus and Dapr.

    ```shell
    dapr run --app-id hello-world --app-port 19090 --app-protocol grpc -- nanobus run --debug --developer-mode bus.ts
    ```

### Invoking the service

The service stores people and publishes welcome events when they are created.

Data objects are stored using Dapr's [State Store](https://docs.dapr.io/developing-applications/building-blocks/state-management/state-management-overview/) API and events are published via the [PubSub](https://docs.dapr.io/developing-applications/building-blocks/pubsub/pubsub-overview/) API. This example is designed to use Redis image that is started in Docker via `dapr init`.

#### Save person in state store and publish welcome event

```sh
curl -L -X POST 'http://localhost:8080/people' \
-H 'Content-Type: application/json' \
--data-raw '{
    "id": "1234",
    "firstName": "John",
    "lastName": "Doe"
}'
```

#### Retrieve person from state store

```sh
curl -L -X GET 'http://localhost:8080/people/1234'
```

## More info

For more info, visit [the NanoBus github repo](https://github.com/nanobus/nanobus).
