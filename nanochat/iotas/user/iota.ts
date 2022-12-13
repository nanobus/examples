import { Handler } from "../../../../nanobus/config/ts/nanobus.ts";

export const UserStore = {
  me: "nanochat.io.user.v1.UserStore::me" as Handler,
  load: "nanochat.io.user.v1.UserStore::load" as Handler,
  getMultiple: "nanochat.io.user.v1.UserStore::getMultiple" as Handler,
  findByHandle: "nanochat.io.user.v1.UserStore::findByHandle" as Handler,
  getFive: "nanochat.io.user.v1.UserStore::getFive" as Handler,
};
