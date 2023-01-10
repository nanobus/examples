import {
  Application,
  Authorization,
  Flow,
  Handler,
  Iota,
} from "https://deno.land/x/nanobusconfig@v0.0.14/mod.ts";

type UUID = string;

interface MessageStoreStoreArgs {
  message: string;
}

interface MessageStoreLoadArgs {
  id: UUID;
}

interface MessageStoreDeleteArgs {
  id: UUID;
}

interface MessageStoreMyMessagesArgs {
  before: Date;
  limit: number;
}

interface MessageStoreGetFeedArgs {
  userIds: UUID[];
  before: Date;
  limit: number;
}

interface MessageStoreGetUserMessagesArgs {
  userId: UUID;
  before: Date;
  limit: number;
}

interface MessageStoreOper {
  store?: Flow<MessageStoreStoreArgs>;
  load?: Flow<MessageStoreLoadArgs>;
  delete?: Flow<MessageStoreDeleteArgs>;
  myMessages?: Flow<MessageStoreMyMessagesArgs>;
  getFeed?: Flow<MessageStoreGetFeedArgs>;
  getUserMessages?: Flow<MessageStoreGetUserMessagesArgs>;
}

interface MessageStoreAuth {
  store?: Authorization;
  load?: Authorization;
  delete?: Authorization;
  myMessages?: Authorization;
  getFeed?: Authorization;
  getUserMessages?: Authorization;
}

export const MessageStore = {
  store: "nanochat.io.message.v1.MessageStore::store" as Handler,
  load: "nanochat.io.message.v1.MessageStore::load" as Handler,
  delete: "nanochat.io.message.v1.MessageStore::delete" as Handler,
  myMessages: "nanochat.io.message.v1.MessageStore::myMessages" as Handler,
  getFeed: "nanochat.io.message.v1.MessageStore::getFeed" as Handler,
  getUserMessages:
    "nanochat.io.message.v1.MessageStore::getUserMessages" as Handler,

  register(app: Application, iface: MessageStoreOper): void {
    app.register(
      MessageStore as unknown as Record<string, Handler>,
      iface as Record<string, Flow<unknown>>,
    );
  },

  authorize(app: Application, auths: MessageStoreAuth): void {
    app.authorize(
      MessageStore as unknown as Record<string, Handler>,
      auths as Record<string, Authorization>,
    );
  },
};

const Interfaces = {
  MessageStore,
};

export const Message: Iota<typeof Interfaces> = {
  $ref: "iotas/message",
  interfaces: Interfaces,
};
