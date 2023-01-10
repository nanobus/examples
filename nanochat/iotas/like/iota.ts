import {
  Application,
  Authorization,
  Flow,
  Handler,
  Iota,
} from "https://deno.land/x/nanobusconfig@v0.0.15/mod.ts";

type UUID = string;

interface LikeStoreLikeArgs {
  likableId: UUID;
}

interface LikeStoreUnlikeArgs {
  likableId: UUID;
}

interface LikeStoreLoadArgs {
  likableId: UUID;
}

interface LikeStoreDeleteArgs {
  likableId: UUID;
}

interface LikeStoreGetMultipleArgs {
  likableIds: UUID[];
}

interface LikeStoreGetLikedByArgs {
  likableId: UUID;
  offset: number;
  limit: number;
}

interface LikeStoreOper {
  like?: Flow<LikeStoreLikeArgs>;
  unlike?: Flow<LikeStoreUnlikeArgs>;
  load?: Flow<LikeStoreLoadArgs>;
  delete?: Flow<LikeStoreDeleteArgs>;
  getMultiple?: Flow<LikeStoreGetMultipleArgs>;
  getLikedBy?: Flow<LikeStoreGetLikedByArgs>;
}

interface LikeStoreAuth {
  like?: Authorization;
  unlike?: Authorization;
  load?: Authorization;
  delete?: Authorization;
  getMultiple?: Authorization;
  getLikedBy?: Authorization;
}

export const LikeStore = {
  like: "nanochat.io.like.v1.LikeStore::like" as Handler,
  unlike: "nanochat.io.like.v1.LikeStore::unlike" as Handler,
  load: "nanochat.io.like.v1.LikeStore::load" as Handler,
  delete: "nanochat.io.like.v1.LikeStore::delete" as Handler,
  getMultiple: "nanochat.io.like.v1.LikeStore::getMultiple" as Handler,
  getLikedBy: "nanochat.io.like.v1.LikeStore::getLikedBy" as Handler,

  register(app: Application, iface: LikeStoreOper): void {
    app.register(
      LikeStore as unknown as Record<string, Handler>,
      iface as Record<string, Flow<unknown>>,
    );
  },

  authorize(app: Application, auths: LikeStoreAuth): void {
    app.authorize(
      LikeStore as unknown as Record<string, Handler>,
      auths as Record<string, Authorization>,
    );
  },
};

const Interfaces = {
  LikeStore,
};

export const Like: Iota<typeof Interfaces> = {
  $ref: "iotas/like",
  interfaces: Interfaces,
};
