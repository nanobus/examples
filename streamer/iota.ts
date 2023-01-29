// deno-lint-ignore-file no-unused-vars ban-unused-ignore
export * from "https://raw.githubusercontent.com/nanobus/nanobus/dx_iteration/config/ts/mod.ts";
import {
  Application,
  Authorization,
  callInterface,
  callProvider,
  Entity,
  Flow,
  Handler,
  Operations,
  Response,
  Step,
  toDataExpr,
} from "https://raw.githubusercontent.com/nanobus/nanobus/dx_iteration/config/ts/mod.ts";

export const types = {
  Customer: "streamer.v1::Customer" as Entity,
};

export type UUID = string;

export interface StreamerOper {
  process?: Flow<void> | Step[];
}

export interface StreamerAuth {
  process?: Authorization;
}

export const Streamer = {
  $interface: "streamer.v1.Streamer",
  process: "streamer.v1.Streamer::process" as Handler,

  register(app: Application, iface: StreamerOper): void {
    app.interface(Streamer.$interface, iface as Operations);
  },

  authorize(app: Application, auths: StreamerAuth): void {
    app.authorize(Streamer.$interface, auths as Record<string, Authorization>);
  },
};

export const streamerClient = {
  process(): Response<unknown> {
    const dataExpr = `{
}`;
    return callInterface(Streamer.process, dataExpr) as Response<unknown>;
  },
};

export interface SourceOper {
  read: Flow<void> | Step[];
}

export interface SourceAuth {
  read?: Authorization;
}

export const Source = {
  $interface: "streamer.v1.Source",
  read: "streamer.v1.Source::read" as Handler,

  register(app: Application, iface: SourceOper): void {
    app.provider(Source.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: SourceAuth): void {
    app.authorize(Source.$interface, auths as Record<string, Authorization>);
  },
};

export const sourceClient = {
  read(): Response<unknown> {
    const dataExpr = `{
}`;
    return callProvider(Source.read, dataExpr) as Response<unknown>;
  },
};

export interface SinkOper {
  write: Flow<void> | Step[];
}

export interface SinkAuth {
  write?: Authorization;
}

export const Sink = {
  $interface: "streamer.v1.Sink",
  write: "streamer.v1.Sink::write" as Handler,

  register(app: Application, iface: SinkOper): void {
    app.provider(Sink.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: SinkAuth): void {
    app.authorize(Sink.$interface, auths as Record<string, Authorization>);
  },
};

export const sinkClient = {
  write(out: unknown): Response<unknown> {
    const dataExpr = `{
 "out": ${toDataExpr(out)}
}`;
    return callProvider(Sink.write, dataExpr) as Response<unknown>;
  },
};

export interface Customer {
  id: UUID;
  firstName: string;
  lastName: string;
}
