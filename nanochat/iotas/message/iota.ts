import { Handler, Iota } from "../../../../nanobus/config/ts/nanobus.ts";

export const MessageStore = {
  store: "nanochat.io.message.v1.MessageStore::store" as Handler,
  load: "nanochat.io.message.v1.MessageStore::load" as Handler,
  delete: "nanochat.io.message.v1.MessageStore::delete" as Handler,
  myMessages: "nanochat.io.message.v1.MessageStore::myMessages" as Handler,
  getFeed: "nanochat.io.message.v1.MessageStore::getFeed" as Handler,
  getUserMessages: "nanochat.io.message.v1.MessageStore::getUserMessages" as Handler,
};

const Interfaces = {
  MessageStore,
}

export const Message: Iota<typeof Interfaces> = {
  $ref: "iotas/message",
  interfaces: Interfaces,
};
