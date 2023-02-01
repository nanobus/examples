// deno-lint-ignore-file no-unused-vars ban-unused-ignore
export * from "https://deno.land/x/nanobusconfig@v0.0.23/mod.ts";
import {
  Application,
  Authorization,
  callInterface,
  callProvider,
  CloudEvent,
  Entity,
  Flow,
  Handler,
  Handlers,
  Operations,
  Response,
  Step,
  toDataExpr
} from "https://deno.land/x/nanobusconfig@v0.0.23/mod.ts";

export const types = {
  Jot: "nanochat.io.v1.jots::Jot" as Entity,
  JotPage: "nanochat.io.v1.jots::JotPage" as Entity,
  User: "nanochat.io.v1.jots::User" as Entity,
  UserPage: "nanochat.io.v1.jots::UserPage" as Entity,
  Pagination: "nanochat.io.v1.jots::Pagination" as Entity
};

export type UUID = string;

export interface JotsPostJotArgs {
  message: string;
}

export interface JotsGetFeedArgs {
  before?: Date;
  limit: number;
}

export interface JotsGetJotArgs {
  id: UUID;
}

export interface JotsDeleteJotArgs {
  id: UUID;
}

export interface JotsLikeArgs {
  id: UUID;
}

export interface JotsUnlikeArgs {
  id: UUID;
}

export interface JotsLikesArgs {
  id: UUID;
  pagination: Pagination;
}

// Jot API
export interface JotsOper {
  // Post a Tweet.
  postJot?: Flow<JotsPostJotArgs> | Step[];
  // Get the jot feed
  getFeed?: Flow<JotsGetFeedArgs> | Step[];
  // Get a tweet by id.
  getJot?: Flow<JotsGetJotArgs> | Step[];
  // Delete a tweet (only creator has access)
  deleteJot?: Flow<JotsDeleteJotArgs> | Step[];
  // Like a tweet
  like?: Flow<JotsLikeArgs> | Step[];
  // Unlike a tweet
  unlike?: Flow<JotsUnlikeArgs> | Step[];
  // Get the users that like a jot.
  likes?: Flow<JotsLikesArgs> | Step[];
}

// Jot API
export interface JotsAuth {
  postJot?: Authorization;
  getFeed?: Authorization;
  getJot?: Authorization;
  deleteJot?: Authorization;
  like?: Authorization;
  unlike?: Authorization;
  likes?: Authorization;
}

// Jot API
export const Jots = {
  $interface: "nanochat.io.v1.jots.Jots",
  // Post a Tweet.
  postJot: "nanochat.io.v1.jots.Jots::postJot" as Handler,
  // Get the jot feed
  getFeed: "nanochat.io.v1.jots.Jots::getFeed" as Handler,
  // Get a tweet by id.
  getJot: "nanochat.io.v1.jots.Jots::getJot" as Handler,
  // Delete a tweet (only creator has access)
  deleteJot: "nanochat.io.v1.jots.Jots::deleteJot" as Handler,
  // Like a tweet
  like: "nanochat.io.v1.jots.Jots::like" as Handler,
  // Unlike a tweet
  unlike: "nanochat.io.v1.jots.Jots::unlike" as Handler,
  // Get the users that like a jot.
  likes: "nanochat.io.v1.jots.Jots::likes" as Handler,

  register(app: Application, iface: JotsOper): void {
    app.interface(Jots.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: JotsAuth): void {
    app.authorize(Jots.$interface, auths as Record<string, Authorization>);
  }
};

// Jot API
export const jotsClient = {
  // Post a Tweet.
  postJot(message: string): Response<Jot> {
    const dataExpr = `{
 "message": ${toDataExpr(message)}
}`;
    return callInterface(Jots.postJot, dataExpr) as Response<Jot>;
  },

  // Get the jot feed
  getFeed(before: Date | undefined, limit: number): Response<JotPage> {
    const dataExpr = `{
 "before": ${toDataExpr(before)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(Jots.getFeed, dataExpr) as Response<JotPage>;
  },

  // Get a tweet by id.
  getJot(id: UUID): Response<Jot> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(Jots.getJot, dataExpr) as Response<Jot>;
  },

  // Delete a tweet (only creator has access)
  deleteJot(id: UUID): Response<Jot> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(Jots.deleteJot, dataExpr) as Response<Jot>;
  },

  // Like a tweet
  like(id: UUID): Response<unknown> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(Jots.like, dataExpr) as Response<unknown>;
  },

  // Unlike a tweet
  unlike(id: UUID): Response<unknown> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(Jots.unlike, dataExpr) as Response<unknown>;
  },

  // Get the users that like a jot.
  likes(id: UUID, pagination: Pagination): Response<UserPage> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
 "pagination": ${toDataExpr(pagination)}
}`;
    return callInterface(Jots.likes, dataExpr) as Response<UserPage>;
  }
};

export interface UsersGetProfileArgs {
  handle: string;
}

export interface UsersGetJotsArgs {
  handle: string;
  before?: Date;
  limit: number;
}

export interface UsersFollowArgs {
  handle: string;
}

export interface UsersUnfollowArgs {
  handle: string;
}

export interface UsersGetFollowsArgs {
  handle: string;
  pagination: Pagination;
}

export interface UsersGetFollowersArgs {
  handle: string;
  pagination: Pagination;
}

// Users API
export interface UsersOper {
  me?: Flow<void> | Step[];
  // Get the user's profile
  getProfile?: Flow<UsersGetProfileArgs> | Step[];
  // Get the user's jots.
  getJots?: Flow<UsersGetJotsArgs> | Step[];
  // Follow a user
  follow?: Flow<UsersFollowArgs> | Step[];
  // Unfollow a user
  unfollow?: Flow<UsersUnfollowArgs> | Step[];
  // Get users the followed by the users
  getFollows?: Flow<UsersGetFollowsArgs> | Step[];
  // Get followers of a user
  getFollowers?: Flow<UsersGetFollowersArgs> | Step[];
}

// Users API
export interface UsersAuth {
  me?: Authorization;
  getProfile?: Authorization;
  getJots?: Authorization;
  follow?: Authorization;
  unfollow?: Authorization;
  getFollows?: Authorization;
  getFollowers?: Authorization;
}

// Users API
export const Users = {
  $interface: "nanochat.io.v1.jots.Users",
  me: "nanochat.io.v1.jots.Users::me" as Handler,
  // Get the user's profile
  getProfile: "nanochat.io.v1.jots.Users::getProfile" as Handler,
  // Get the user's jots.
  getJots: "nanochat.io.v1.jots.Users::getJots" as Handler,
  // Follow a user
  follow: "nanochat.io.v1.jots.Users::follow" as Handler,
  // Unfollow a user
  unfollow: "nanochat.io.v1.jots.Users::unfollow" as Handler,
  // Get users the followed by the users
  getFollows: "nanochat.io.v1.jots.Users::getFollows" as Handler,
  // Get followers of a user
  getFollowers: "nanochat.io.v1.jots.Users::getFollowers" as Handler,

  register(app: Application, iface: UsersOper): void {
    app.interface(Users.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: UsersAuth): void {
    app.authorize(Users.$interface, auths as Record<string, Authorization>);
  }
};

// Users API
export const usersClient = {
  me(): Response<User> {
    const dataExpr = `{
}`;
    return callInterface(Users.me, dataExpr) as Response<User>;
  },

  // Get the user's profile
  getProfile(handle: string): Response<User> {
    const dataExpr = `{
 "handle": ${toDataExpr(handle)}
}`;
    return callInterface(Users.getProfile, dataExpr) as Response<User>;
  },

  // Get the user's jots.
  getJots(
    handle: string,
    before: Date | undefined,
    limit: number
  ): Response<JotPage> {
    const dataExpr = `{
 "handle": ${toDataExpr(handle)}
 "before": ${toDataExpr(before)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(Users.getJots, dataExpr) as Response<JotPage>;
  },

  // Follow a user
  follow(handle: string): Response<unknown> {
    const dataExpr = `{
 "handle": ${toDataExpr(handle)}
}`;
    return callInterface(Users.follow, dataExpr) as Response<unknown>;
  },

  // Unfollow a user
  unfollow(handle: string): Response<unknown> {
    const dataExpr = `{
 "handle": ${toDataExpr(handle)}
}`;
    return callInterface(Users.unfollow, dataExpr) as Response<unknown>;
  },

  // Get users the followed by the users
  getFollows(handle: string, pagination: Pagination): Response<UserPage> {
    const dataExpr = `{
 "handle": ${toDataExpr(handle)}
 "pagination": ${toDataExpr(pagination)}
}`;
    return callInterface(Users.getFollows, dataExpr) as Response<UserPage>;
  },

  // Get followers of a user
  getFollowers(handle: string, pagination: Pagination): Response<UserPage> {
    const dataExpr = `{
 "handle": ${toDataExpr(handle)}
 "pagination": ${toDataExpr(pagination)}
}`;
    return callInterface(Users.getFollowers, dataExpr) as Response<UserPage>;
  }
};

// Jot entity
export interface Jot {
  // The dynamically generated ID.
  id: UUID;
  // The jot owner ID.
  userId: UUID;
  // The jot owner handle
  handle: string;
  // The message body.
  message: string;
  // The time the tweet was entered.
  time: Date;
  // The number of likes.
  likes: number;
}

// Jot page
export interface JotPage {
  // Before timestamp
  before?: Date;
  // Limit result
  limit: number;
  // The tweets returned
  items: Array<Jot>;
}

// User entity
export interface User {
  // User ID.
  id: UUID;
  // Handle.
  handle: string;
  // The number of followers
  followers: number;
  // The number of users followed
  follows: number;
  // If the authenticated user is following this user. Will return false if
  // unauthenticated or outside of Users::getProfile.
  isFollowing: boolean;
}

// User page
export interface UserPage {
  // Offet
  offset: number;
  // Limit
  limit: number;
  // The users returned
  items: Array<User>;
}

// Pagination query parameters
export interface Pagination {
  // Offset
  offset: number;
  // Limit
  limit: number;
}

export const interfaces = {
  Jots,
  Users
};
