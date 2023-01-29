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
  User: "nanochat.io.user.v1::User" as Entity
};

export type UUID = string;

export interface UserStoreLoadArgs {
  userId: UUID;
}

export interface UserStoreGetMultipleArgs {
  userIds: Array<UUID>;
}

export interface UserStoreFindByHandleArgs {
  handle: string;
}

export interface UserStoreOper {
  me?: Flow<void> | Step[];
  load?: Flow<UserStoreLoadArgs> | Step[];
  getMultiple?: Flow<UserStoreGetMultipleArgs> | Step[];
  findByHandle?: Flow<UserStoreFindByHandleArgs> | Step[];
  getFive?: Flow<void> | Step[];
}

export interface UserStoreAuth {
  me?: Authorization;
  load?: Authorization;
  getMultiple?: Authorization;
  findByHandle?: Authorization;
  getFive?: Authorization;
}

export const UserStore = {
  $interface: "nanochat.io.user.v1.UserStore",
  me: "nanochat.io.user.v1.UserStore::me" as Handler,
  load: "nanochat.io.user.v1.UserStore::load" as Handler,
  getMultiple: "nanochat.io.user.v1.UserStore::getMultiple" as Handler,
  findByHandle: "nanochat.io.user.v1.UserStore::findByHandle" as Handler,
  getFive: "nanochat.io.user.v1.UserStore::getFive" as Handler,

  register(app: Application, iface: UserStoreOper): void {
    app.interface(UserStore.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: UserStoreAuth): void {
    app.authorize(UserStore.$interface, auths as Record<string, Authorization>);
  }
};

export const userStoreClient = {
  me(): Response<User> {
    const dataExpr = `{
}`;
    return callInterface(UserStore.me, dataExpr) as Response<User>;
  },

  load(userId: UUID): Response<User> {
    const dataExpr = `{
 "userId": ${toDataExpr(userId)}
}`;
    return callInterface(UserStore.load, dataExpr) as Response<User>;
  },

  getMultiple(userIds: Array<UUID>): Response<unknown> {
    const dataExpr = `{
 "userIds": ${toDataExpr(userIds)}
}`;
    return callInterface(UserStore.getMultiple, dataExpr) as Response<unknown>;
  },

  findByHandle(handle: string): Response<User> {
    const dataExpr = `{
 "handle": ${toDataExpr(handle)}
}`;
    return callInterface(UserStore.findByHandle, dataExpr) as Response<User>;
  },

  getFive(): Response<unknown> {
    const dataExpr = `{
}`;
    return callInterface(UserStore.getFive, dataExpr) as Response<unknown>;
  }
};

// User record
export interface User {
  // User ID.
  id: UUID;
  // Handle.
  handle: string;
}

export const interfaces = {
  UserStore
};
