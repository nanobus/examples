import {
  Application,
  Authorization,
  Flow,
  Handler,
  Iota,
} from "https://deno.land/x/nanobus_config@v0.0.12/mod.ts";

export interface UserIdArgs {
  userId: string;
}

interface GetMultipleArgs {
  userIds: string[];
}

interface FollowArgs {
  followedId: string;
}

interface FetchFollowersArgs {
  userId: string;
  offset: number;
  limit: number;
}

interface FollowStoreOper {
  load?: Flow<UserIdArgs>;
  getMultiple?: Flow<GetMultipleArgs>;
  isFollowing?: Flow<UserIdArgs>;
  follow?: Flow<FollowArgs>;
  unfollow?: Flow<FollowArgs>;
  fetchFollowers?: Flow<FetchFollowersArgs>;
  fetchFollows?: Flow<FetchFollowersArgs>;
  myFollows?: Flow<void>;
}

interface FollowStoreAuth {
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
  load: "nanochat.io.follows.v1.FollowStore::load" as Handler,
  getMultiple: "nanochat.io.follows.v1.FollowStore::getMultiple" as Handler,
  isFollowing: "nanochat.io.follows.v1.FollowStore::isFollowing" as Handler,
  follow: "nanochat.io.follows.v1.FollowStore::follow" as Handler,
  unfollow: "nanochat.io.follows.v1.FollowStore::unfollow" as Handler,
  fetchFollowers:
    "nanochat.io.follows.v1.FollowStore::fetchFollowers" as Handler,
  fetchFollows: "nanochat.io.follows.v1.FollowStore::fetchFollows" as Handler,
  myFollows: "nanochat.io.follows.v1.FollowStore::myFollows" as Handler,

  register(app: Application, iface: FollowStoreOper): void {
    app.register(
      FollowStore as unknown as Record<string, Handler>,
      iface as Record<string, Flow<unknown>>,
    );
  },

  authorize(app: Application, auths: FollowStoreAuth): void {
    app.authorize(
      FollowStore as unknown as Record<string, Handler>,
      auths as Record<string, Authorization>,
    );
  },
};

const Interfaces = {
  FollowStore,
};

export const Follow: Iota<typeof Interfaces> = {
  $ref: "iotas/follow",
  interfaces: Interfaces,
};
