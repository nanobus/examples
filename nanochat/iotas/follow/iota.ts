import { Handler, Iota } from "../../../../nanobus/config/ts/nanobus.ts";

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

const Interfaces = {
  FollowStore,
}

export const Follow: Iota<typeof Interfaces> = {
  $ref: "iotas/follow",
  interfaces: Interfaces,
};
