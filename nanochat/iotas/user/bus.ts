#!/usr/bin/env -S deno run
import {
  Application,
  PostgresActions,
  step,
} from "https://deno.land/x/nanobus_config@v0.0.12/mod.ts";
import { UserStore } from "./iota.ts";

const app = new Application("like", "0.0.1").spec("apex.axdl");

// app.initializer(
//   "userdb",
//   migrate.MigratePostgresV1({
//     dataSource: env("USER_DB"),
//     directory: "sql",
//   }),
// );

const userdb = app.resource("userdb");

// const _retries = app.retries({
//   database: constantBackoff("3s"),
// });

// const _circuitBreakers = app.circuitBreakers({
//   database: {},
// });

const dbResiliency = {
  // retry: retries.database,
  // circuitBreaker: circuitBreakers.database,
};

const database = new PostgresActions(userdb);

UserStore.register(app, {
  me: ({ claims }) => [
    step(
      "Loads my profile",
      database.queryOne(
        `
SELECT * FROM "user"
WHERE id = $1`,
        claims.sub,
      ),
      dbResiliency,
    ),
  ],

  load: ({ input }) => [
    step(
      "Load a single user",
      database.queryOne(
        `
SELECT * FROM "user"
WHERE id = $1`,
        input.userId,
      ),
      dbResiliency,
    ),
  ],

  getMultiple: ({ input }) => [
    step(
      "Lookup many users",
      database.query(
        `
SELECT * FROM "user"
WHERE id = any($1)`,
        input.userIds,
      ),
      dbResiliency,
    ),
  ],

  findByHandle: ({ input }) => [
    step(
      "Lookup user by handle",
      database.queryOne(
        `
SELECT * FROM "user"
WHERE handle = $1`,
        input.handle,
      ),
      dbResiliency,
    ),
  ],

  getFive: () => [
    step(
      "Find five random users",
      database.query(`
SELECT * FROM "user"
ORDER BY RAND()
LIMIT 5`),
      dbResiliency,
    ),
  ],
});

app.emit();
