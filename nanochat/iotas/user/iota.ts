import {
  Application,
  Authorization,
  Flow,
  Handler,
  Iota,
} from "https://deno.land/x/nanobus_config@v0.0.12/mod.ts";

type UUID = string;

interface UserStoreLoadArgs {
  userId: UUID;
}

interface UserStoreGetMultipleArgs {
  userIds: UUID[];
}

interface UserStoreFindByHandleArgs {
  handle: string;
}

interface UserStoreOper {
  me?: Flow<void>;
  load?: Flow<UserStoreLoadArgs>;
  getMultiple?: Flow<UserStoreGetMultipleArgs>;
  findByHandle?: Flow<UserStoreFindByHandleArgs>;
  getFive?: Flow<void>;
}

interface UserStoreAuth {
  me?: Authorization;
  load?: Authorization;
  getMultiple?: Authorization;
  findByHandle?: Authorization;
  getFive?: Authorization;
}

export const UserStore = {
  me: "nanochat.io.user.v1.UserStore::me" as Handler,
  load: "nanochat.io.user.v1.UserStore::load" as Handler,
  getMultiple: "nanochat.io.user.v1.UserStore::getMultiple" as Handler,
  findByHandle: "nanochat.io.user.v1.UserStore::findByHandle" as Handler,
  getFive: "nanochat.io.user.v1.UserStore::getFive" as Handler,

  register(app: Application, iface: UserStoreOper): void {
    app.register(
      UserStore as unknown as Record<string, Handler>,
      iface as Record<string, Flow<unknown>>,
    );
  },

  authorize(app: Application, auths: UserStoreAuth): void {
    app.authorize(
      UserStore as unknown as Record<string, Handler>,
      auths as Record<string, Authorization>,
    );
  },
};

const Interfaces = {
  UserStore,
};

export const User: Iota<typeof Interfaces> = {
  $ref: "iotas/user",
  interfaces: Interfaces,
};
