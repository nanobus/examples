import { Handler } from "../../nanobus/config/ts/nanobus.ts";

export const Jots = {
  postJot: "nanochat.io.v1.jots.Jots::postJot" as Handler,
  getFeed: "nanochat.io.v1.jots.Jots::getFeed" as Handler,
  getJot: "nanochat.io.v1.jots.Jots::getJot" as Handler,
  deleteJot: "nanochat.io.v1.jots.Jots::deleteJot" as Handler,
  like: "nanochat.io.v1.jots.Jots::like" as Handler,
  unlike: "nanochat.io.v1.jots.Jots::unlike" as Handler,
  likes: "nanochat.io.v1.jots.Jots::likes" as Handler,
};

export const Users = {
  me: "nanochat.io.v1.jots.Users::me" as Handler,
  getProfile: "nanochat.io.v1.jots.Users::getProfile" as Handler,
  getJots: "nanochat.io.v1.jots.Users::getJots" as Handler,
  follow: "nanochat.io.v1.jots.Users::follow" as Handler,
  unfollow: "nanochat.io.v1.jots.Users::unfollow" as Handler,
  getFollows: "nanochat.io.v1.jots.Users::getFollows" as Handler,
  getFollowers: "nanochat.io.v1.jots.Users::getFollowers" as Handler,
};
