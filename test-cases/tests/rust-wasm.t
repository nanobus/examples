
Simple nocode request/response

  $ echo '{}' | TESTLANG=rust nanobus invoke $TESTDIR/../config/wasm-req-res.yaml "suite.test::op"
  "test"
