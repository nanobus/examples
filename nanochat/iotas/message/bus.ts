import { MigratePostgresV1 } from "../../../../nanobus/config/ts/components/migrate_postgres.ts";
import {
  Application,
  constantBackoff,
  env,
  postgres,
  step,
} from "../../../../nanobus/config/ts/mod.ts";
import { MessageStore } from "./iota.ts";

const app = new Application("message", "0.0.1").spec("apex.axdl");

app.initializer(
  "messagedb",
  MigratePostgresV1({
    dataSource: env("MESSAGE_DB"),
    directory: "sql",
  }),
);

const messagedb = app.resource("messagedb");

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

app.intercept(MessageStore.store, [
  step(
    "Store a tweet",
    postgres.Query({
      resource: messagedb,
      single: true,
      sql: `
INSERT INTO message (user_id, message, time)
VALUES ($1, $2, now())
RETURNING *`,
      args: ["claims.sub", "input.message"],
    }),
    dbResiliency,
  ),
]).intercept(MessageStore.load, [
  step(
    "Get a single message",
    postgres.Query({
      resource: messagedb,
      single: true,
      sql: `
SELECT * FROM message
WHERE id = $1`,
      args: ["input.id"],
    }),
    dbResiliency,
  ),
]).intercept(MessageStore.delete, [
  step(
    "Remove a message",
    postgres.Query({
      resource: messagedb,
      single: true,
      sql: `
DELETE FROM message
WHERE id = $1
  AND user_id = $2
RETURNING *`,
      args: ["input.id", "claims.sub"],
    }),
    dbResiliency,
  ),
]).intercept(MessageStore.myMessages, [
  step(
    "Get the tweet timeline",
    postgres.Query({
      resource: messagedb,
      sql: `
SELECT t.* FROM message t
JOIN follows f ON t.user_id = f.follows
WHERE f.follower = $1
  AND (t.time < $2 OR $2 IS NULL)
ORDER BY t.time DESC LIMIT $3`,
      args: ["claims.sub", "input.before", "input.limit"],
    }),
    dbResiliency,
  ),
]).intercept(MessageStore.getFeed, [
  step(
    "Get message timeline for multiple users",
    postgres.Query({
      resource: messagedb,
      sql: `
SELECT * FROM message t
WHERE (t.user_id = any($1) OR t.user_id = $2)
  AND (t.time < $3 OR $3 IS NULL)
ORDER BY time DESC`,
      args: ["input.userIds", "claims.sub", "input.before"],
    }),
    {
      ...dbResiliency,
      returns: "exists",
    },
  ),
]).intercept(MessageStore.getUserMessages, [
  step(
    "Get message timeline for a single user",
    postgres.Query({
      resource: messagedb,
      sql: `
SELECT * FROM message t
WHERE t.user_id = $1
  AND (t.time < $2 OR $2 IS NULL)
ORDER BY time DESC`,
      args: ["input.userId", "input.before"],
    }),
    {
      ...dbResiliency,
      returns: "exists",
    },
  ),
])

app.emit();
