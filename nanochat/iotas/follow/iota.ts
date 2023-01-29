// deno-lint-ignore-file no-unused-vars ban-unused-ignore
export * from "https://deno.land/x/nanobusconfig@v0.0.22/mod.ts";
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
} from "https://deno.land/x/nanobusconfig@v0.0.22/mod.ts";

export const types = {
  FollowRef: "nanochat.io.follows.v1::FollowRef" as Entity,
  UserRef: "nanochat.io.follows.v1::UserRef" as Entity,
  Follow: "nanochat.io.follows.v1::Follow" as Entity
};

export type UUID = string;

export interface FollowStoreLoadArgs {
  userId: UUID;
}

export interface FollowStoreGetMultipleArgs {
  userIds: Array<UUID>;
}

export interface FollowStoreIsFollowingArgs {
  userId: UUID;
}

export interface FollowStoreFollowArgs {
  followedId: UUID;
}

export interface FollowStoreUnfollowArgs {
  followedId: UUID;
}

export interface FollowStoreFetchFollowersArgs {
  userId: UUID;
  offset: number;
  limit: number;
}

export interface FollowStoreFetchFollowsArgs {
  userId: UUID;
  offset: number;
  limit: number;
}

export interface FollowStoreOper {
  load?: Flow<FollowStoreLoadArgs> | Step[];
  getMultiple?: Flow<FollowStoreGetMultipleArgs> | Step[];
  isFollowing?: Flow<FollowStoreIsFollowingArgs> | Step[];
  follow?: Flow<FollowStoreFollowArgs> | Step[];
  unfollow?: Flow<FollowStoreUnfollowArgs> | Step[];
  fetchFollowers?: Flow<FollowStoreFetchFollowersArgs> | Step[];
  fetchFollows?: Flow<FollowStoreFetchFollowsArgs> | Step[];
  myFollows?: Flow<void> | Step[];
}

export interface FollowStoreAuth {
  load?: Authorization;
  getMultiple?: Authorization;
  isFollowing?: Authorization;
  follow?: Authorization;
  unfollow?: Authorization;
  fetchFollowers?: Authorization;
  fetchFollows?: Authorization;
  myFollows?: Authorization;
}

export const FollowStore = {
  $interface: "nanochat.io.follows.v1.FollowStore",
  load: "nanochat.io.follows.v1.FollowStore::load" as Handler,
  getMultiple: "nanochat.io.follows.v1.FollowStore::getMultiple" as Handler,
  isFollowing: "nanochat.io.follows.v1.FollowStore::isFollowing" as Handler,
  follow: "nanochat.io.follows.v1.FollowStore::follow" as Handler,
  unfollow: "nanochat.io.follows.v1.FollowStore::unfollow" as Handler,
  fetchFollowers: "nanochat.io.follows.v1.FollowStore::fetchFollowers" as Handler,
  fetchFollows: "nanochat.io.follows.v1.FollowStore::fetchFollows" as Handler,
  myFollows: "nanochat.io.follows.v1.FollowStore::myFollows" as Handler,

  register(app: Application, iface: FollowStoreOper): void {
    app.interface(FollowStore.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: FollowStoreAuth): void {
    app.authorize(
      FollowStore.$interface,
      auths as Record<string, Authorization>
    );
  }
};

export const followStoreClient = {
  load(userId: UUID): Response<UserRef> {
    const dataExpr = `{
 "userId": ${toDataExpr(userId)}
}`;
    return callInterface(FollowStore.load, dataExpr) as Response<UserRef>;
  },

  getMultiple(userIds: Array<UUID>): Response<unknown> {
    const dataExpr = `{
 "userIds": ${toDataExpr(userIds)}
}`;
    return callInterface(FollowStore.getMultiple, dataExpr) as Response<
      unknown
    >;
  },

  isFollowing(userId: UUID): Response<boolean> {
    const dataExpr = `{
 "userId": ${toDataExpr(userId)}
}`;
    return callInterface(FollowStore.isFollowing, dataExpr) as Response<
      boolean
    >;
  },

  follow(followedId: UUID): Response<unknown> {
    const dataExpr = `{
 "followedId": ${toDataExpr(followedId)}
}`;
    return callInterface(FollowStore.follow, dataExpr) as Response<unknown>;
  },

  unfollow(followedId: UUID): Response<unknown> {
    const dataExpr = `{
 "followedId": ${toDataExpr(followedId)}
}`;
    return callInterface(FollowStore.unfollow, dataExpr) as Response<unknown>;
  },

  fetchFollowers(
    userId: UUID,
    offset: number,
    limit: number
  ): Response<unknown> {
    const dataExpr = `{
 "userId": ${toDataExpr(userId)}
 "offset": ${toDataExpr(offset)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(FollowStore.fetchFollowers, dataExpr) as Response<
      unknown
    >;
  },

  fetchFollows(userId: UUID, offset: number, limit: number): Response<unknown> {
    const dataExpr = `{
 "userId": ${toDataExpr(userId)}
 "offset": ${toDataExpr(offset)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(FollowStore.fetchFollows, dataExpr) as Response<
      unknown
    >;
  },

  myFollows(): Response<unknown> {
    const dataExpr = `{
}`;
    return callInterface(FollowStore.myFollows, dataExpr) as Response<unknown>;
  }
};

export interface FollowRef {
  // User ID.
  id: UUID;
  // Creation timestamp (for sorting)
  time: Date;
}

// User record
export interface UserRef {
  // User ID.
  id: UUID;
  // The number of followers
  followers: number;
  // The number of users followed
  follows: number;
}

// Follow record
export interface Follow {
  // The ID of the user being followed
  followedId: UUID;
  // The follower's user ID
  followerId: UUID;
  // Creation timestamp (for sorting)
  time: Date;
}

export const interfaces = {
  FollowStore
};
