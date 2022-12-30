
Simple nocode request/response

  $ echo '{}' | TESTLANG=rust nanobus invoke --bus $TESTDIR/../config/wasm-req-res.yaml "suite.test::op"
  "test"
