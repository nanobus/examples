
Simple nocode request/response

  $ echo '{"name": "World!"}' | nanobus invoke $TESTDIR/../bus.yaml greeter::say-hello
  "Hello, World!"

As a web service

  $ nanobus run $TESTDIR/../bus.yaml >/dev/null &
  $ sleep .5
  $ curl -s -H "Content-Type: application/json" -d '{"name":"World!"}' -o "-" http://localhost:8080/hello
  "Hello, World!" (no-eol)
  $ kill %1
