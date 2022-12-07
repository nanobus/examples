import {
  Application,
  CallProvider,
  constantBackoff,
  duration,
  env,
  HTTPResponse,
  Log,
  migrate,
  postgres,
  RestModule,
  step,
  unauthenticated,
} from "https://deno.land/x/nanobus_config@v0.0.9/mod.ts";
import { Shortener } from "./iota.ts";

const app = new Application("url-shortener", "0.0.1")
  .spec("apex.axdl")
  .main("build/urlshortener.wasm")
  .package({
    registry: "reg.candle.run",
    org: "examples",
  })
  .use(new RestModule(":8080"));

const db = app.resource("db");

const _timeouts = app.timeouts({
  events: duration("30s"),
});

const retries = app.retries({
  events: constantBackoff("3s"),
  database: constantBackoff("3s"),
});

const circuitBreakers = app.circuitBreakers({
  database: {
    timeout: duration("60s"),
  },
  publish: {
    maxRequests: 2,
    timeout: duration("30s"),
  },
});

app.initializer(
  "db",
  migrate.MigratePostgresV1({
    dataSource: env("URLSHORTENER_DB"),
    sourceUrl: env("URLSHORTENER_SQL"),
  }),
);

const repository = app.provider("urlshortener.v1.Repository", {
  loadById: [
    step(
      "Load by ID",
      postgres.Load({
        resource: db,
        namespace: "urlshortener.v1",
        type: "URL",
        key: "input.id",
      }),
      {
        retry: retries.database,
        circuitBreaker: circuitBreakers.database,
      },
    ),
  ],
  loadByURL: [
    step(
      "Load by URL",
      postgres.FindOne({
        resource: db,
        namespace: "urlshortener.v1",
        type: "URL",
        where: [
          {
            query: "url = ?",
            value: "input.url",
          },
        ],
        notFoundError: "not_found",
      }),
      {
        retry: retries.database,
        circuitBreaker: circuitBreakers.database,
      },
    ),
  ],
  storeURL: [
    step(
      "Store the URL",
      postgres.Exec({
        resource: db,
        sql: "INSERT INTO url (id, url) VALUES ($1, $2)",
        args: ["input.id", "input.url"],
      }),
      {
        retry: retries.database,
        circuitBreaker: circuitBreakers.database,
      },
    ),
  ],
});

app.implement({
  [Shortener.lookup]: [
    step(
      "Load URL",
      CallProvider({
        handler: repository.loadById,
      }),
      {
        returns: "location",
        retry: retries.database,
        circuitBreaker: circuitBreakers.database,
      },
    ),
    step(
      "Redirect",
      HTTPResponse({
        status: 301,
        headers: [
          {
            name: "Location",
            value: "location.url",
          },
        ],
      }),
    ),
  ],
});

app.interface("events", {
  onReceiveURL: [
    step(
      "Log",
      Log({
        format: "Received URL: id=%q; url=%q",
        args: ["input.data.id", "input.data.url"],
      }),
    ),
  ],
});

// Allow unauthenticated to shortener.
app.authorizations({
  [Shortener.shorten]: unauthenticated,
  [Shortener.lookup]: unauthenticated,
});

app.errors({
  // Override generic not found error
  // with URL centric messages.
  not_found: {
    type: "URLNotFound",
    code: "not_found",
    title: "URL not found",
    message: "URL with id {{ .key }} was not found",
  },
});

app.emit();
