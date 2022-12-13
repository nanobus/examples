import { Handler } from "../../../../nanobus/config/ts/nanobus.ts";

export const LikeStore = {
  like: "nanochat.io.like.v1.LikeStore::like" as Handler,
  unlike: "nanochat.io.like.v1.LikeStore::unlike" as Handler,
  load: "nanochat.io.like.v1.LikeStore::load" as Handler,
  delete: "nanochat.io.like.v1.LikeStore::delete" as Handler,
  getMultiple: "nanochat.io.like.v1.LikeStore::getMultiple" as Handler,
  getLikedBy: "nanochat.io.like.v1.LikeStore::getLikedBy" as Handler,
};
