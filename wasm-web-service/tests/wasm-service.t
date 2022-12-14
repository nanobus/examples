
Test web service via curl

  $ nanobus run --bus $TESTDIR/../bus.yaml >/dev/null &
  $ sleep .5
  $ curl -s -H "Content-Type: application/json" -d '{"name":"World"}' -o "-" http://localhost:8080/hello
  "Hello, World!" (no-eol)
  $ kill %1

Test web service via invoke

  $ echo '{"name":"World"}' | nanobus invoke $TESTDIR/../bus.yaml "my-module.v1.Greeter::sayHello"
  "Hello, World!"
