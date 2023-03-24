# No-code web service

This example shows how to turn a basic no-code interface into a functioning web service.

## Running

```sh
nanobus run --debug
```

## Querying the service

You can now query the web service with a tool like curl:

```sh
curl -H "Content-Type: application/json" \
       -d '{"name":"World!"}' \
       http://localhost:8080/hello
```

## Run tests

```sh
apex test
```