import { MigratePostgresV1 } from "../../nanobus/config/ts/components/migrate_postgres.ts";
import {
  Application,
  AuthStyle,
  env,
  JWTV1,
  postgres,
  RestModule,
  secured,
  SessionV1,
  singlePageAppPaths,
  standardErrors,
  step,
  unauthenticated,
  UserInfoV1,
} from "../../nanobus/config/ts/mod.ts";
import { Jots, Users } from "./iota.ts";

const app = new Application("nanochat", "0.0.1")
  .spec("apex.axdl")
  .main("build/jot-go.wasm");

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
    MigratePostgresV1({ dataSource: env(db.env), directory: db.dir }),
  );
});

app.include("iotas/follow", {
  resourceLinks: {
    followdb: followdb,
  },
});
app.include("iotas/like", {
  resourceLinks: {
    likedb: likedb,
  },
});
app.include("iotas/message", {
  resourceLinks: {
    messagedb: messagedb,
  },
});
app.include("iotas/user", {
  resourceLinks: {
    userdb: userdb,
  },
});

const authenticated = { has: ["sub"] };

app.authorizations(
  // Jots
  secured(Jots.postJot, authenticated),
  secured(Jots.getFeed, authenticated),
  unauthenticated(Jots.getJot),
  secured(Jots.deleteJot, authenticated),
  secured(Jots.like, authenticated),
  secured(Jots.unlike, authenticated),
  unauthenticated(Jots.likes),
  // Users
  secured(Users.me, authenticated),
  unauthenticated(Users.getProfile),
  unauthenticated(Users.getJots),
  secured(Users.follow, authenticated),
  secured(Users.unfollow, authenticated),
  unauthenticated(Users.getFollows),
  unauthenticated(Users.getFollowers),
);

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

app.emit();
