import { MigratePostgresV1 } from "../../../../nanobus/config/ts/components/migrate_postgres.ts";
import {
  Application,
  constantBackoff,
  env,
  postgres,
  step,
} from "../../../../nanobus/config/ts/mod.ts";
import { LikeStore } from "./iota.ts";

const app = new Application("like", "0.0.1").spec("apex.axdl");

app.initializer(
  "likedb",
  MigratePostgresV1({
    dataSource: env("LIKE_DB"),
    directory: "sql",
  }),
);

const likedb = app.resource("likedb");

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

app.intercept(LikeStore.like, [
  step(
    "Store like",
    postgres.Exec({
      resource: likedb,
      sql: `SELECT fn_like($1, $2) as success;`,
      args: ["claims.sub", "input.likableId"],
    }),
    dbResiliency,
  ),
]).intercept(LikeStore.unlike, [
  step(
    "Remove like",
    postgres.Exec({
      resource: likedb,
      sql: `SELECT fn_unlike($1, $2) as success;`,
      args: ["claims.sub", "input.likableId"],
    }),
    dbResiliency,
  ),
]).intercept(LikeStore.load, [
  step(
    "Lookup likable by id",
    postgres.Query({
      resource: likedb,
      single: true,
      sql: `
SELECT t.id, t.likes
FROM likable t
WHERE t.id = $1`,
      args: ["input.likableId"],
    }),
    dbResiliency,
  ),
]).intercept(LikeStore.delete, [
  step(
    "Delete the likable by id",
    postgres.Exec({
      resource: likedb,
      sql: `
DELETE FROM likable t
WHERE t.id = $1`,
      args: ["input.likableId"],
    }),
    dbResiliency,
  ),
]).intercept(LikeStore.getMultiple, [
  step(
    "Get multiple likables",
    postgres.Query({
      resource: likedb,
      sql: `
SELECT t.id, t.likes
FROM likable t
WHERE t.id = any($1)`,
      args: ["input.likableIds"],
    }),
    dbResiliency,
  ),
]).intercept(LikeStore.getLikedBy, [
  step(
    "Fetch users likes",
    postgres.Query({
      resource: likedb,
      sql: `
SELECT l.user_id as user_id, l.time
FROM likes l
WHERE l.likable_id = $1
ORDER BY l.time DESC
OFFSET $2
LIMIT $3`,
      args: ["input.likableId", "input.offset", "input.limit"],
    }),
    {
      ...dbResiliency,
      returns: "exists",
    },
  ),
]);

app.emit();
