build:
  just test-cases/build
  just wasm-web-service/build

test:
  just test-cases/test
  just nocode-invocation/test
  just basic-web-service/test
  just wasm-web-service/test


