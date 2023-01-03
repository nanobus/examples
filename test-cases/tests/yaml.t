
Simple nocode request/response

  $ echo '{}' | nanobus invoke --bus $TESTDIR/../config/yaml-req-res.yaml "suite.test::op"
  "test"
