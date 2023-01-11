# No-code example

Simple NanoBus example showing how to set up a minimal interface and invoke it from the command line.

## Running

```sh
$ echo '{"name": "World!"}' | nanobus invoke bus.yaml Greeter::sayHello
```

## Run tests

```sh
$ just test
```