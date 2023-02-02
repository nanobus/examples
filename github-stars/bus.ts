#!/usr/bin/env -S deno run
import {
  Application,
  Context,
  discord,
  env,
  filter,
  HttpModule,
  POST,
  StarEvent,
  unauthenticated,
} from "./iota.ts";

const app = new Application("github-stars", "0.0.1")
  .spec("apex.axdl");

const webhooks = app.interface("webhooks", {
  star: ({ input, flow }: Context<StarEvent>) =>
    flow.then(
      "Filter on create actions with a login",
      () =>
        filter(
          `${input.action} == "create" && ${input.sender.login} != null && ${input.repository.full_name} != null`,
        ),
    ).then(
      "Send message to Discord channel",
      () =>
        discord.SendMessage({
          channelId: `"${env("DISCORD_CHANNEL_ID")}"`,
          content:
            `"Thanks, " + ${input.sender.login} + ", for starring " + ${input.repository.full_name} + "!"`,
        }),
    ),
});

app.authorize(webhooks, {
  star: unauthenticated,
});

app.use(
  new HttpModule(
    ":8080",
    {},
    POST(env("WEBHOOK_URI"), webhooks.star),
  ),
);
