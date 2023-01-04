import { Handler } from "../../nanobus/config/ts/mod.ts";

export const Shortener = {
  $interface: "urlshortener.v1.Shortener",
  shorten: "urlshortener.v1.Shortener::shorten" as Handler,
  lookup: "urlshortener.v1.Shortener::lookup" as Handler,
};