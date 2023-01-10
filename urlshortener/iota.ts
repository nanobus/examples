import {
  Application,
  Authorization,
  callProvider,
  Flow,
  Handler,
  Response,
  toDataExpr,
} from "https://deno.land/x/nanobusconfig@v0.0.15/mod.ts";

export interface ShortenerShortenArgs {
  url: string;
}

export interface ShortenerLookupArgs {
  id: string;
}

export interface URL {
  /** The dynamically generated URL identifier. */
  id: string;
  /** The original URL that was shortened. */
  url: string;
}

export interface ShortenerOper {
  shorten?: Flow<ShortenerShortenArgs>;
  lookup?: Flow<ShortenerLookupArgs>;
}

export interface ShortenerAuth {
  shorten?: Authorization;
  lookup?: Authorization;
}

export const Shortener = {
  $interface: "urlshortener.v1.Shortener",
  shorten: "urlshortener.v1.Shortener::shorten" as Handler,
  lookup: "urlshortener.v1.Shortener::lookup" as Handler,

  register(app: Application, iface: ShortenerOper): void {
    app.register(
      Shortener as unknown as Record<string, Handler>,
      iface as Record<string, Flow<unknown>>,
    );
  },

  authorize(app: Application, auths: ShortenerAuth): void {
    app.authorize(
      Shortener as unknown as Record<string, Handler>,
      auths as Record<string, Authorization>,
    );
  },
};

export interface RepositoryLoadByIdArgs {
  id: string;
}

export interface RepositoryLoadByURLArgs {
  url: string;
}

export interface RepositoryOper {
  loadById?: Flow<RepositoryLoadByIdArgs>;
  loadByURL?: Flow<RepositoryLoadByURLArgs>;
  storeURL?: Flow<URL>;
}

export const Repository = {
  $interface: "urlshortener.v1.Repository",
  loadById: "urlshortener.v1.Repository::loadById" as Handler,
  loadByURL: "urlshortener.v1.Repository::loadByURL" as Handler,
  storeURL: "urlshortener.v1.Repository::storeURL" as Handler,

  register(app: Application, iface: RepositoryOper): void {
    app.provide(
      Repository as unknown as Record<string, Handler>,
      iface as Record<string, Flow<unknown>>,
    );
  },
};

export const repositoryClient = {
  loadById(id: string): Response<URL> {
    const dataExpr = `{
  "id": ${toDataExpr(id)},
}`;
    return callProvider(Repository.loadById, dataExpr) as Response<URL>;
  },
};
