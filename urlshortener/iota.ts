// deno-lint-ignore-file no-unused-vars ban-unused-ignore
export * from "https://deno.land/x/nanobusconfig@v0.0.21/mod.ts";
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
} from "https://deno.land/x/nanobusconfig@v0.0.21/mod.ts";

export const types = {
  URL: "urlshortener.v1::URL" as Entity
};

export interface ShortenerShortenArgs {
  url: string;
}

export interface ShortenerLookupArgs {
  id: string;
}

// The URL shortening service.
export interface ShortenerOper {
  // Shorten a URL and return a generated identifier.
  shorten?: Flow<ShortenerShortenArgs> | Step[];
  // Return the URL using the generated identifier.
  lookup?: Flow<ShortenerLookupArgs> | Step[];
}

// The URL shortening service.
export interface ShortenerAuth {
  shorten?: Authorization;
  lookup?: Authorization;
}

// The URL shortening service.
export const Shortener = {
  $interface: "urlshortener.v1.Shortener",
  // Shorten a URL and return a generated identifier.
  shorten: "urlshortener.v1.Shortener::shorten" as Handler,
  // Return the URL using the generated identifier.
  lookup: "urlshortener.v1.Shortener::lookup" as Handler,

  register(app: Application, iface: ShortenerOper): void {
    app.interface(Shortener.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: ShortenerAuth): void {
    app.authorize(Shortener.$interface, auths as Record<string, Authorization>);
  }
};

// The URL shortening service.
export const shortenerClient = {
  // Shorten a URL and return a generated identifier.
  shorten(url: string): Response<URL> {
    const dataExpr = `{
 "url": ${toDataExpr(url)}
}`;
    return callInterface(Shortener.shorten, dataExpr) as Response<URL>;
  },

  // Return the URL using the generated identifier.
  lookup(id: string): Response<URL> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(Shortener.lookup, dataExpr) as Response<URL>;
  }
};

export interface RepositoryLoadByIdArgs {
  id: string;
}

export interface RepositoryLoadByURLArgs {
  url: string;
}

// Repository handles loading and storing shortened URLs.
export interface RepositoryOper {
  // Load the URL by its identifier.
  loadById: Flow<RepositoryLoadByIdArgs> | Step[];
  // Load the ID by its URL.
  loadByURL: Flow<RepositoryLoadByURLArgs> | Step[];
  // Store a URL and its identifier.
  storeURL: Flow<URL> | Step[];
}

// Repository handles loading and storing shortened URLs.
export interface RepositoryAuth {
  loadById?: Authorization;
  loadByUrl?: Authorization;
  storeUrl?: Authorization;
}

// Repository handles loading and storing shortened URLs.
export const Repository = {
  $interface: "urlshortener.v1.Repository",
  // Load the URL by its identifier.
  loadById: "urlshortener.v1.Repository::loadById" as Handler,
  // Load the ID by its URL.
  loadByURL: "urlshortener.v1.Repository::loadByURL" as Handler,
  // Store a URL and its identifier.
  storeURL: "urlshortener.v1.Repository::storeURL" as Handler,

  register(app: Application, iface: RepositoryOper): void {
    app.provider(Repository.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: RepositoryAuth): void {
    app.authorize(
      Repository.$interface,
      auths as Record<string, Authorization>
    );
  }
};

// Repository handles loading and storing shortened URLs.
export const repositoryClient = {
  // Load the URL by its identifier.
  loadById(id: string): Response<URL> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callProvider(Repository.loadById, dataExpr) as Response<URL>;
  },

  // Load the ID by its URL.
  loadByURL(url: string): Response<URL> {
    const dataExpr = `{
 "url": ${toDataExpr(url)}
}`;
    return callProvider(Repository.loadByURL, dataExpr) as Response<URL>;
  },

  // Store a URL and its identifier.
  storeURL(url: URL): Response<unknown> {
    const dataExpr = `{
 "url": ${toDataExpr(url)}
}`;
    return callProvider(Repository.storeURL, dataExpr) as Response<unknown>;
  }
};

// URL encapsulates the dynamic identifier and the URL it points to.
export interface URL {
  // The dynamically generated URL identifier.
  id: string;
  // The original URL that was shortened.
  url: string;
}

export const interfaces = {
  Shortener,
  Repository
};
