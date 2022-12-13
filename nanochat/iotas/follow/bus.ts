import { MigratePostgresV1 } from "../../../../nanobus/config/ts/components/migrate_postgres.ts";
import {
  Application,
  Assign,
  constantBackoff,
  env,
  postgres,
  Step,
  step,
} from "../../../../nanobus/config/ts/mod.ts";
import { FollowStore } from "./iota.ts";

const app = new Application("follow", "0.0.1").spec("apex.axdl");

app.initializer(
  "followdb",
  MigratePostgresV1({
    dataSource: env("FOLLOW_DB"),
    directory: "sql",
  }),
);

const followdb = app.resource("followdb");

const _retries = app.retries({
  database: constantBackoff("3s"),
});

const _circuitBreakers = app.circuitBreakers({
  database: {},
});

const dbResiliency: Partial<Step> = {
  // retry: retries.database,
  // circuitBreaker: circuitBreakers.database,
};

app.intercept(FollowStore.load, [
  step(
    "Lookup user by ID",
    postgres.Query({
      single: true,
      resource: followdb,
      sql: `
SELECT u.id, u.followers, u.follows
FROM follow_user u
WHERE id = $1`,
      args: ["input.userId"],
    }),
    dbResiliency,
  ),
]);

app.intercept(FollowStore.getMultiple, [
  step(
    "Lookup multiple users by ID",
    postgres.Query({
      resource: followdb,
      sql: `
SELECT u.id, u.followers, u.follows
FROM follow_user u
WHERE id = any($1)`,
      args: ["input.userIds"],
    }),
    dbResiliency,
  ),
]);

app.intercept(FollowStore.isFollowing, [
  step(
    "Lookup user by ID",
    postgres.Query({
      single: true,
      resource: followdb,
      sql: `
SELECT EXISTS (
  SELECT *
  FROM follow
  WHERE follower = $1
    AND follows = $2
) as following;`,
      args: ["claims.sub", "input.userId"],
    }),
    {
      ...dbResiliency,
      returns: "exists",
    },
  ),
  step(
    "Return boolean",
    Assign({
      value: "exists.following",
    }),
  ),
]).intercept(FollowStore.follow, [
  step(
    "Store follower",
    postgres.Exec({
      resource: followdb,
      sql: `
SELECT fn_follow($1, $2) as success;`,
      args: ["claims.sub", "input.followedId"],
    }),
    dbResiliency,
  ),
]).intercept(FollowStore.unfollow, [
  step(
    "Delete follower",
    postgres.Exec({
      resource: followdb,
      sql: `
SELECT fn_unfollow($1, $2) as success;`,
      args: ["claims.sub", "input.followedId"],
    }),
    dbResiliency,
  ),
]).intercept(FollowStore.fetchFollowers, [
  step(
    "Fetch followers",
    postgres.Query({
      resource: followdb,
      sql: `
SELECT u.id, f.time
FROM follow_user u
JOIN follow f ON u.id = f.follower
WHERE f.follows = $1
ORDER BY f.time DESC
OFFSET $2
LIMIT $3`,
      args: ["input.userId", "input.offset", "input.limit"],
    }),
    dbResiliency,
  ),
]).intercept(FollowStore.fetchFollows, [
  step(
    "Fetch follows",
    postgres.Query({
      resource: followdb,
      sql: `
SELECT u.id, f.time
FROM follow_user u
JOIN follow f ON u.id = f.follows
WHERE f.follower = $1
ORDER BY f.time DESC
OFFSET $2
LIMIT $3`,
      args: ["input.userId", "input.offset", "input.limit"],
    }),
    dbResiliency,
  ),
]).intercept(FollowStore.myFollows, [
  step(
    "Fetch my follows",
    postgres.Query({
      resource: followdb,
      sql: `
SELECT u.id, f.time
FROM follow_user u
JOIN follow f ON u.id = f.follows
WHERE f.follower = $1`,
      args: ["claims.sub"],
    }),
    dbResiliency,
  ),
]);

app.emit();
