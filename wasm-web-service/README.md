# WebAssembly-powered web service

This example shows how to use WebAssembly iotas with nanobus.

## Running

```sh
$ nanobus run
```

## Querying the service

You can now query the web service with a tool like curl:

```sh
$ curl -H "Content-Type: application/json" \
       -d '{"name":"World!"}' \
       http://localhost:8080/hello
```

## Run tests

```sh
$ just test
```