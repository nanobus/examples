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
  Message: "nanochat.io.message.v1::Message" as Entity
};

export type UUID = string;

export interface MessageStoreStoreArgs {
  message: string;
}

export interface MessageStoreLoadArgs {
  id: UUID;
}

export interface MessageStoreDeleteArgs {
  id: UUID;
}

export interface MessageStoreMyMessagesArgs {
  before?: Date;
  limit: number;
}

export interface MessageStoreGetFeedArgs {
  userIds: Array<UUID>;
  before?: Date;
  limit: number;
}

export interface MessageStoreGetUserMessagesArgs {
  userId: UUID;
  before?: Date;
  limit: number;
}

export interface MessageStoreOper {
  store?: Flow<MessageStoreStoreArgs> | Step[];
  load?: Flow<MessageStoreLoadArgs> | Step[];
  delete?: Flow<MessageStoreDeleteArgs> | Step[];
  myMessages?: Flow<MessageStoreMyMessagesArgs> | Step[];
  getFeed?: Flow<MessageStoreGetFeedArgs> | Step[];
  getUserMessages?: Flow<MessageStoreGetUserMessagesArgs> | Step[];
}

export interface MessageStoreAuth {
  store?: Authorization;
  load?: Authorization;
  delete?: Authorization;
  myMessages?: Authorization;
  getFeed?: Authorization;
  getUserMessages?: Authorization;
}

export const MessageStore = {
  $interface: "nanochat.io.message.v1.MessageStore",
  store: "nanochat.io.message.v1.MessageStore::store" as Handler,
  load: "nanochat.io.message.v1.MessageStore::load" as Handler,
  delete: "nanochat.io.message.v1.MessageStore::delete" as Handler,
  myMessages: "nanochat.io.message.v1.MessageStore::myMessages" as Handler,
  getFeed: "nanochat.io.message.v1.MessageStore::getFeed" as Handler,
  getUserMessages: "nanochat.io.message.v1.MessageStore::getUserMessages" as Handler,

  register(app: Application, iface: MessageStoreOper): void {
    app.interface(MessageStore.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: MessageStoreAuth): void {
    app.authorize(
      MessageStore.$interface,
      auths as Record<string, Authorization>
    );
  }
};

export const messageStoreClient = {
  store(message: string): Response<Message> {
    const dataExpr = `{
 "message": ${toDataExpr(message)}
}`;
    return callInterface(MessageStore.store, dataExpr) as Response<Message>;
  },

  load(id: UUID): Response<Message> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(MessageStore.load, dataExpr) as Response<Message>;
  },

  delete(id: UUID): Response<Message> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(MessageStore.delete, dataExpr) as Response<Message>;
  },

  myMessages(before: Date | undefined, limit: number): Response<unknown> {
    const dataExpr = `{
 "before": ${toDataExpr(before)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(MessageStore.myMessages, dataExpr) as Response<
      unknown
    >;
  },

  getFeed(
    userIds: Array<UUID>,
    before: Date | undefined,
    limit: number
  ): Response<unknown> {
    const dataExpr = `{
 "userIds": ${toDataExpr(userIds)}
 "before": ${toDataExpr(before)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(MessageStore.getFeed, dataExpr) as Response<unknown>;
  },

  getUserMessages(
    userId: UUID,
    before: Date | undefined,
    limit: number
  ): Response<unknown> {
    const dataExpr = `{
 "userId": ${toDataExpr(userId)}
 "before": ${toDataExpr(before)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(MessageStore.getUserMessages, dataExpr) as Response<
      unknown
    >;
  }
};

// Message record.
export interface Message {
  // The dynamically generated Tweet ID.
  id: UUID;
  // The tweet owner.
  userId: UUID;
  // The message body.
  message: string;
  // The time the tweet was entered.
  time: Date;
}

export const interfaces = {
  MessageStore
};
