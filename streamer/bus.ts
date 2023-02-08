#!/usr/bin/env -S deno run
import {
  Application,
  BlobActions,
  codecs,
  env,
  migrate,
  PostgresActions,
  RestModule,
  Sink,
  Source,
  Streamer,
  types,
  unauthenticated,
} from "./iota.ts";

const app = new Application("streamer", "0.0.1")
  .spec("apex.axdl")
  .main("build/streamer.wasm")
  .use(new RestModule(":8080"));

app.setTracing({
  uses: "jaeger",
  with: {
    collectorEndpoint: env("JAEGER_TRACES_ENDPOINT"),
  },
});

const db = app.resource("db");
const blob = app.resource("blob");

app.initializer(
  "db",
  migrate.MigratePostgresV1({
    dataSource: env("STREAMER_DB"),
    sourceUrl: env("STREAMER_SQL"),
  }),
);

Streamer.authorize(app, {
  process: unauthenticated,
});

const database = new PostgresActions(db);
const storage = new BlobActions(blob);

Source.register(app, {
  read: ({ flow }) =>
    flow.then(
      "read database",
      () => database.find(types.Customer),
    ),
});

Sink.register(app, {
  write: ({ flow }) =>
    flow.then(
      "write to blob",
      () =>
        storage.write(`"customers.json"`, codecs.JSON, {
          delimiterString: "\n",
        }),
    ),
});
