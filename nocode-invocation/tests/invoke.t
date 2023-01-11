
Simple nocode request/response

  $ echo '{"name": "World!"}' | nanobus invoke $TESTDIR/../bus.yaml Greeter::sayHello
  "Hello, World!"
