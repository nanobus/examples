
Simple nocode request/response

  $ echo '{}' | TESTLANG=go nanobus invoke $TESTDIR/../config/wasm-req-res.yaml "suite.test::op"
  "test"

