#!/usr/bin/env -S deno run
import {
  Application,
  Expr,
  PostgresActions,
  step,
} from "https://deno.land/x/nanobusconfig@v0.0.15/mod.ts";
import { FollowStore } from "./iota.ts";

const app = new Application("follow", "0.0.1").spec("apex.axdl");

// app.initializer(
//   "followdb",
//   migrate.MigratePostgresV1({
//     dataSource: env("FOLLOW_DB"),
//     directory: "sql",
//   }),
// );

const followdb = app.resource("followdb");

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

const database = new PostgresActions(followdb);

FollowStore.register(app, {
  load: ({ input }) => [
    step(
      "Lookup user by ID",
      database.queryOne(
        `SELECT u.id, u.followers, u.follows
FROM follow_user u
WHERE id = $1`,
        input.userId,
      ),
      dbResiliency,
    ),
  ],

  getMultiple: ({ input }) => [
    step(
      "Lookup multiple users by ID",
      database.query(
        `SELECT u.id, u.followers, u.follows
FROM follow_user u
WHERE id = any($1)`,
        input.userIds,
      ),
      dbResiliency,
    ),
  ],

  isFollowing: (
    { claims, input },
    { exists }: { exists: { following: boolean } },
  ) => [
    step(
      "Lookup user by ID",
      database.queryOne(
        `SELECT EXISTS (
  SELECT *
  FROM follow
  WHERE follower = $1
    AND follows = $2
) as following;`,
        claims.sub,
        input.userId,
      ),
      dbResiliency,
    ).return(exists),

    step(
      "Return boolean",
      Expr({
        value: exists.following,
      }),
    ),
  ],

  follow: ({ claims, input }) => [
    step(
      "Store follower",
      database.exec(
        `SELECT fn_follow($1, $2) as success;`,
        claims.sub,
        input.followedId,
      ),
      dbResiliency,
    ),
  ],

  unfollow: ({ claims, input }) => [
    step(
      "Delete follower",
      database.exec(
        `SELECT fn_unfollow($1, $2) as success;`,
        claims.sub,
        input.followedId,
      ),
      dbResiliency,
    ),
  ],

  fetchFollowers: ({ input }) => [
    step(
      "Fetch followers",
      database.query(
        `
SELECT u.id, f.time
FROM follow_user u
JOIN follow f ON u.id = f.follower
WHERE f.follows = $1
ORDER BY f.time DESC
OFFSET $2
LIMIT $3`,
        input.userId,
        input.offset,
        input.limit,
      ),
      dbResiliency,
    ),
  ],

  fetchFollows: ({ input }) => [
    step(
      "Fetch follows",
      database.query(
        `
SELECT u.id, f.time
FROM follow_user u
JOIN follow f ON u.id = f.follows
WHERE f.follower = $1
ORDER BY f.time DESC
OFFSET $2
LIMIT $3`,
        input.userId,
        input.offset,
        input.limit,
      ),
      dbResiliency,
    ),
  ],

  myFollows: ({ claims }) => [
    step(
      "Fetch my follows",
      database.query(
        `
SELECT u.id, f.time
FROM follow_user u
JOIN follow f ON u.id = f.follows
WHERE f.follower = $1`,
        claims.sub,
      ),
      dbResiliency,
    ),
  ],
});

app.emit();
