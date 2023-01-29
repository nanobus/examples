#!/usr/bin/env -S deno run
import {
  Application,
  AuthStyle,
  env,
  Jots,
  JWTV1,
  migrate,
  postgres,
  RestModule,
  SessionV1,
  singlePageAppPaths,
  standardErrors,
  step,
  unauthenticated,
  UserInfoV1,
  Users,
} from "./iota.ts";

const app = new Application("nanochat", "0.0.4")
  .spec("apex.axdl")
  .main("build/nanochat-go.wasm");

const followdb = app.resource("followdb");
const likedb = app.resource("likedb");
const messagedb = app.resource("messagedb");
const userdb = app.resource("userdb");

// Initialization: SQL migration
[
  { name: "followdb", env: "FOLLOW_DB", dir: "iotas/follow/sql" },
  { name: "likedb", env: "LIKE_DB", dir: "iotas/like/sql" },
  { name: "messagedb", env: "MESSAGE_DB", dir: "iotas/message/sql" },
  { name: "user", env: "USER_DB", dir: "iotas/user/sql" },
].forEach((db) => {
  app.initializer(
    db.name,
    migrate.MigratePostgresV1({ dataSource: env(db.env), directory: db.dir }),
  );
});

import { interfaces as Follow } from "./iotas/follow/iota.ts";
const _follow = app.import("follow", "iotas/follow", Follow, {
  resourceLinks: {
    followdb: followdb,
  },
});

import { interfaces as Like } from "./iotas/like/iota.ts";
const _like = app.import("like", "iotas/like", Like, {
  resourceLinks: {
    likedb: likedb,
  },
});

import { interfaces as Message } from "./iotas/message/iota.ts";
const _message = app.import("message", "iotas/message", Message, {
  resourceLinks: {
    messagedb: messagedb,
  },
});

import { interfaces as User } from "./iotas/user/iota.ts";
const _user = app.import("user", "iotas/user", User, {
  resourceLinks: {
    userdb: userdb,
  },
});

// A authorization rule to verify an authenticated user.
// Make sure there is a "sub" (subject) claim.
const secured = { has: ["sub"] };

Jots.authorize(app, {
  postJot: secured,
  getFeed: secured,
  getJot: unauthenticated,
  deleteJot: secured,
  like: secured,
  unlike: secured,
  likes: unauthenticated,
});

Users.authorize(app, {
  me: secured,
  getProfile: unauthenticated,
  getJots: unauthenticated,
  follow: secured,
  unfollow: secured,
  getFollows: unauthenticated,
  getFollowers: unauthenticated,
});

const security = app.provider("security", {
  getAccessToken: [
    step(
      "Select access token",
      postgres.Query({
        resource: userdb,
        single: true,
        sql: `
SELECT access_token, token_type
FROM "session"
WHERE sid = $1
  AND expiry >= now()`,
        args: ["sid"],
      }),
    ),
  ],
  storeSession: [
    step(
      "Create user if none exists",
      postgres.Exec({
        resource: userdb,
        sql: `
INSERT INTO "user" (id, handle, email)
VALUES ($1, $2, $3)
ON CONFLICT DO NOTHING`,
        args: ["claims.sub", `claims.${env("HANDLE_CLAIM")}`, "claims.email"],
      }),
    ),
    step(
      "Create a session",
      postgres.Exec({
        resource: userdb,
        sql: `
INSERT INTO "session" (sid, uid, access_token, expiry, refresh_token, token_type)
VALUES ($1, $2, $3, $4, $5, $6)
ON CONFLICT (sid) DO UPDATE
SET uid = $2, access_token = $3, expiry = $4, refresh_token = $5, token_type = $6`,
        args: [
          "claims.sid",
          "claims.sub",
          "access_token",
          "expiry",
          "refresh_token",
          "token_type",
        ],
      }),
    ),
  ],
});

app.use(
  new RestModule(":8080", {
    oauth2: {
      clientId: env("OAUTH_CLIENT_ID"),
      clientSecret: env("OAUTH_CLIENT_SECRET"),
      endpoint: {
        authUrl: env("OAUTH_AUTH_URL"),
        tokenUrl: env("OAUTH_TOKEN_URL"),
        userInfoUrl: env("USERINFO_URL"),
        authStyle: AuthStyle.InHeader,
      },
      callbackUrl: env("OAUTH_REDIRECT_URL"),
      handler: security.storeSession,
      scopes: [env("OAUTH_SCOPES")],
    },
    static: {
      paths: singlePageAppPaths("ui/dist", "/assets", "/css", "/images"),
    },
    cors: {
      allowedOrigins: ["nanochat.io", "localhost"],
    },
  }),
);

app.filters(
  SessionV1({
    handler: security.getAccessToken,
  }),
  UserInfoV1({
    userInfoUrl: env("USERINFO_URL"),
  }),
  JWTV1({
    jwksUrl: env("OAUTH_JWKS_URL"),
  }),
);

app.errors({
  ...standardErrors,
  user_not_found: {
    type: "UserNotFound",
    code: "not_found",
    title: "User not found",
    message: "User with handle {{ .handle }} is not found",
  },
  jot_not_found: {
    type: "JotNotFound",
    code: "not_found",
    title: "Jot not found",
    message: "Jot with id {{ .messageId }} is not found",
  },
});
