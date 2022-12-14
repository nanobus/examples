import { MigratePostgresV1 } from "../../../../nanobus/config/ts/components/migrate_postgres.ts";
import {
  Application,
  constantBackoff,
  env,
  postgres,
  step,
} from "../../../../nanobus/config/ts/mod.ts";
import { UserStore } from "./iota.ts";

const app = new Application("like", "0.0.1").spec("apex.axdl");

app.initializer(
  "userdb",
  MigratePostgresV1({
    dataSource: env("USER_DB"),
    directory: "sql",
  }),
);

const userdb = app.resource("userdb");

const _retries = app.retries({
  database: constantBackoff("3s"),
});

const _circuitBreakers = app.circuitBreakers({
  database: {},
});

const dbResiliency = {
  // retry: retries.database,
  // circuitBreaker: circuitBreakers.database,
};

app.intercept(UserStore.me, [
  step(
    "Loads my profile",
    postgres.Query({
      resource: userdb,
      single: true,
      sql: `
SELECT * FROM "user"
WHERE id = $1`,
      args: ["claims.sub"],
    }),
    dbResiliency,
  ),
]).intercept(UserStore.load, [
  step(
    "Load a single user",
    postgres.Query({
      resource: userdb,
      single: true,
      sql: `
SELECT * FROM "user"
WHERE id = $1`,
      args: ["input.userId"],
    }),
    dbResiliency,
  ),
]).intercept(UserStore.getMultiple, [
  step(
    "Lookup many users",
    postgres.Query({
      resource: userdb,
      sql: `
SELECT * FROM "user"
WHERE id = any($1)`,
      args: ["input.userIds"],
    }),
    dbResiliency,
  ),
]).intercept(UserStore.findByHandle, [
  step(
    "Lookup user by handle",
    postgres.Query({
      resource: userdb,
      single: true,
      sql: `
SELECT * FROM "user"
WHERE handle = $1`,
      args: ["input.handle"],
    }),
    dbResiliency,
  ),
]).intercept(UserStore.getFive, [
  step(
    "Find five random users",
    postgres.Query({
      resource: userdb,
      sql: `
SELECT * FROM "user"
ORDER BY RAND()
LIMIT 5`,
    }),
    dbResiliency,
  ),
]);

app.emit();
