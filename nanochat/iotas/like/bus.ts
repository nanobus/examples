#!/usr/bin/env -S deno run
import {
  Application,
  PostgresActions,
  step,
} from "https://deno.land/x/nanobusconfig@v0.0.14/mod.ts";
import { LikeStore } from "./iota.ts";

const app = new Application("like", "0.0.1").spec("apex.axdl");

// app.initializer(
//   "likedb",
//   migrate.MigratePostgresV1({
//     dataSource: env("LIKE_DB"),
//     directory: "sql",
//   }),
// );

const likedb = app.resource("likedb");

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

const database = new PostgresActions(likedb);

LikeStore.register(app, {
  like: ({ claims, input }) => [
    step(
      "Store like",
      database.exec(
        `SELECT fn_like($1, $2) as success;`,
        claims.sub,
        input.likableId,
      ),
      dbResiliency,
    ),
  ],

  unlike: ({ claims, input }) => [
    step(
      "Remove like",
      database.exec(
        `SELECT fn_unlike($1, $2) as success;`,
        claims.sub,
        input.likableId,
      ),
      dbResiliency,
    ),
  ],

  load: ({ input }) => [
    step(
      "Lookup likable by id",
      database.queryOne(
        `
SELECT t.id, t.likes
FROM likable t
WHERE t.id = $1`,
        input.likableId,
      ),
      dbResiliency,
    ),
  ],

  delete: ({ input }) => [
    step(
      "Delete the likable by id",
      database.exec(
        `
DELETE FROM likable t
WHERE t.id = $1`,
        input.likableId,
      ),
      dbResiliency,
    ),
  ],

  getMultiple: ({ input }) => [
    step(
      "Get multiple likables",
      database.query(
        `
SELECT t.id, t.likes
FROM likable t
WHERE t.id = any($1)`,
        input.likableIds,
      ),
      dbResiliency,
    ),
  ],

  getLikedBy: ({ input }) => [
    step(
      "Fetch users likes",
      database.query(
        `
SELECT l.user_id as user_id, l.time
FROM likes l
WHERE l.likable_id = $1
ORDER BY l.time DESC
OFFSET $2
LIMIT $3`,
        input.likableId,
        input.offset,
        input.limit,
      ),
      dbResiliency,
    ),
  ],
});

app.emit();
