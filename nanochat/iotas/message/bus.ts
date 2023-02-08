#!/usr/bin/env -S deno run
import {
  Application,
  PostgresActions,
  step,
  MessageStore,
} from "./iota.ts";

const app = new Application("message", "0.0.1").spec("apex.axdl");

// app.initializer(
//   "messagedb",
//   migrate.MigratePostgresV1({
//     dataSource: env("MESSAGE_DB"),
//     directory: "sql",
//   }),
// );

const messagedb = app.resource("messagedb");

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

const database = new PostgresActions(messagedb);

MessageStore.register(app, {
  store: ({ claims, input }) => [
    step(
      "Store a tweet",
      database.queryOne(
        `
INSERT INTO message (user_id, message, time)
VALUES ($1, $2, now())
RETURNING *`,
        claims.sub,
        input.message,
      ),
      dbResiliency,
    ),
  ],

  load: ({ input }) => [
    step(
      "Get a single message",
      database.queryOne(
        `
SELECT * FROM message
WHERE id = $1`,
        input.id,
      ),
      dbResiliency,
    ),
  ],

  delete: ({ claims, input }) => [
    step(
      "Remove a message",
      database.queryOne(
        `
DELETE FROM message
WHERE id = $1
  AND user_id = $2
RETURNING *`,
        input.id,
        claims.sub,
      ),
      dbResiliency,
    ),
  ],

  myMessages: ({ claims, input }) => [
    step(
      "Get the tweet timeline",
      database.query(
        `
SELECT t.* FROM message t
JOIN follows f ON t.user_id = f.follows
WHERE f.follower = $1
  AND (t.time < $2 OR $2 IS NULL)
ORDER BY t.time DESC LIMIT $3`,
        claims.sub,
        input.before,
        input.limit,
      ),
      dbResiliency,
    ),
  ],

  getFeed: ({ claims, input }) => [
    step(
      "Get message timeline for multiple users",
      database.query(
        `
SELECT * FROM message t
WHERE (t.user_id = any($1) OR t.user_id = $2)
  AND (t.time < $3 OR $3 IS NULL)
ORDER BY time DESC`,
        input.userIds,
        claims.sub,
        input.before,
      ),
      dbResiliency,
    ),
  ],

  getUserMessages: ({ input }) => [
    step(
      "Get message timeline for a single user",
      database.query(
        `
SELECT * FROM message t
WHERE t.user_id = $1
  AND (t.time < $2 OR $2 IS NULL)
ORDER BY time DESC`,
        input.userId,
        input.before,
      ),
      dbResiliency,
    ),
  ],
});
