import { Handler } from "../../../../nanobus/config/ts/nanobus.ts";

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
};

export const Follow = {
  FollowStore: FollowStore,
};
