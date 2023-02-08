// deno-lint-ignore-file no-unused-vars ban-unused-ignore
export * from "https://deno.land/x/nanobusconfig@v0.0.23/mod.ts";
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
} from "https://deno.land/x/nanobusconfig@v0.0.23/mod.ts";

export const types = {
  LikeRef: "nanochat.io.like.v1::LikeRef" as Entity,
  Likable: "nanochat.io.like.v1::Likable" as Entity,
  Like: "nanochat.io.like.v1::Like" as Entity
};

export type UUID = string;

export interface LikeStoreLikeArgs {
  likableId: UUID;
}

export interface LikeStoreUnlikeArgs {
  likableId: UUID;
}

export interface LikeStoreLoadArgs {
  likableId: UUID;
}

export interface LikeStoreDeleteArgs {
  likableId: UUID;
}

export interface LikeStoreGetMultipleArgs {
  likableIds: Array<UUID>;
}

export interface LikeStoreGetLikedByArgs {
  likableId: UUID;
  offset: number;
  limit: number;
}

export interface LikeStoreOper {
  like?: Flow<LikeStoreLikeArgs> | Step[];
  unlike?: Flow<LikeStoreUnlikeArgs> | Step[];
  load?: Flow<LikeStoreLoadArgs> | Step[];
  delete?: Flow<LikeStoreDeleteArgs> | Step[];
  getMultiple?: Flow<LikeStoreGetMultipleArgs> | Step[];
  getLikedBy?: Flow<LikeStoreGetLikedByArgs> | Step[];
}

export interface LikeStoreAuth {
  like?: Authorization;
  unlike?: Authorization;
  load?: Authorization;
  delete?: Authorization;
  getMultiple?: Authorization;
  getLikedBy?: Authorization;
}

export const LikeStore = {
  $interface: "nanochat.io.like.v1.LikeStore",
  like: "nanochat.io.like.v1.LikeStore::like" as Handler,
  unlike: "nanochat.io.like.v1.LikeStore::unlike" as Handler,
  load: "nanochat.io.like.v1.LikeStore::load" as Handler,
  delete: "nanochat.io.like.v1.LikeStore::delete" as Handler,
  getMultiple: "nanochat.io.like.v1.LikeStore::getMultiple" as Handler,
  getLikedBy: "nanochat.io.like.v1.LikeStore::getLikedBy" as Handler,

  register(app: Application, iface: LikeStoreOper): void {
    app.interface(LikeStore.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: LikeStoreAuth): void {
    app.authorize(LikeStore.$interface, auths as Record<string, Authorization>);
  }
};

export const likeStoreClient = {
  like(likableId: UUID): Response<unknown> {
    const dataExpr = `{
 "likableId": ${toDataExpr(likableId)}
}`;
    return callInterface(LikeStore.like, dataExpr) as Response<unknown>;
  },

  unlike(likableId: UUID): Response<unknown> {
    const dataExpr = `{
 "likableId": ${toDataExpr(likableId)}
}`;
    return callInterface(LikeStore.unlike, dataExpr) as Response<unknown>;
  },

  load(likableId: UUID): Response<Likable> {
    const dataExpr = `{
 "likableId": ${toDataExpr(likableId)}
}`;
    return callInterface(LikeStore.load, dataExpr) as Response<Likable>;
  },

  delete(likableId: UUID): Response<Likable> {
    const dataExpr = `{
 "likableId": ${toDataExpr(likableId)}
}`;
    return callInterface(LikeStore.delete, dataExpr) as Response<Likable>;
  },

  getMultiple(likableIds: Array<UUID>): Response<unknown> {
    const dataExpr = `{
 "likableIds": ${toDataExpr(likableIds)}
}`;
    return callInterface(LikeStore.getMultiple, dataExpr) as Response<unknown>;
  },

  getLikedBy(
    likableId: UUID,
    offset: number,
    limit: number
  ): Response<unknown> {
    const dataExpr = `{
 "likableId": ${toDataExpr(likableId)}
 "offset": ${toDataExpr(offset)}
 "limit": ${toDataExpr(limit)}
}`;
    return callInterface(LikeStore.getLikedBy, dataExpr) as Response<unknown>;
  }
};

export interface LikeRef {
  // The likers's user ID
  userId: UUID;
  // Creation timestamp (for sorting)
  time: Date;
}

export interface Likable {
  // Identifer of the likable entity.
  id: UUID;
  // The number of likes.
  likes: number;
}

// Like record
export interface Like {
  // The tweet ID liked
  likableId: UUID;
  // The likers's user ID
  userId: UUID;
  // Creation timestamp (for sorting)
  time: Date;
}

export const interfaces = {
  LikeStore
};
