#!/usr/bin/env -S deno run
import {
  Application,
  constantBackoff,
  duration,
  env,
  HTTPResponse,
  migrate,
  PostgresActions,
  RestModule,
  returns,
  unauthenticated,
} from "https://deno.land/x/nanobusconfig@v0.0.14/mod.ts";
import { Repository, repositoryClient, Shortener, URL } from "./iota.ts";

const app = new Application("url-shortener", "0.0.1")
  .spec("apex.axdl")
  .main("build/urlshortener.wasm")
  .package({
    registry: "reg.candle.run",
    org: "examples",
  })
  .use(new RestModule(":8080"));

// TODO: Update tracing config snippet after
// https://github.com/nanobus/nanobus/issues/87
// is fixed.

// Commented out for a simpler demo
// See oauth-setup for instructions for setting up an OAuth/OIDC provider.
// app.filters(JWTV1({
//   jwksUrl: env("JWKS_URL"),
// }));

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

const dbResiliency = {
  retry: retries.database,
  circuitBreaker: circuitBreakers.database,
};

app.initializer(
  "db",
  migrate.MigratePostgresV1({
    dataSource: env("URLSHORTENER_DB"),
    sourceUrl: env("URLSHORTENER_SQL"),
  }),
);

const database = new PostgresActions(db);

// Allow unauthenticated access to shortener.
Shortener.authorize(app, {
  shorten: unauthenticated,
  lookup: unauthenticated,
});

Shortener.register(app, {
  lookup: (
    // Input and flow builder
    { flow },
    // Variables
    { target }: { target: URL },
  ) =>
    flow
      .then(
        // Call provider to load the URL.
        "Load URL",
        ($) => repositoryClient.loadById($.id),
        returns(target),
      )
      .then(
        // Set the HTTP response to redirect
        // the browser to the real location.
        "Redirect",
        (_) =>
          HTTPResponse({
            status: 301,
            headers: [
              {
                name: "Location",
                value: target.url,
              },
            ],
          }),
      ),
});

Repository.register(app, {
  loadById: ({ flow }) =>
    flow.then(
      "Load by ID",
      ($) =>
        database.load({
          namespace: "urlshortener.v1",
          type: "URL",
          key: $.id,
        }),
      dbResiliency,
    ),

  loadByURL: ({ flow }) =>
    flow.then(
      "Load by URL",
      ($) =>
        database.findOne({
          namespace: "urlshortener.v1",
          type: "URL",
          where: [
            {
              query: "url = ?",
              value: $.url,
            },
          ],
          notFoundError: "not_found",
        }),
      dbResiliency,
    ),

  storeURL: ({ flow }) =>
    flow.then(
      "Store the URL",
      ($) =>
        database.exec("INSERT INTO url (id, url) VALUES ($1, $2)", $.id, $.url),
      dbResiliency,
    ),
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
