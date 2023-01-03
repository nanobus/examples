
Simple nocode request/response

  $ echo '{"name": "World!"}' | nanobus invoke --bus $TESTDIR/../bus.yaml Greeter::sayHello
  "Hello, World!"
