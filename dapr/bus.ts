#!/usr/bin/env -S deno run
import {
  Application,
  dapr,
  DaprServerV1,
  HTTPResponse,
  HttpServerV1,
  log,
  RouterV1,
  step,
  unauthenticated,
} from "https://deno.land/x/nanobusconfig@v0.0.15/mod.ts";

const app = new Application("dapr-example", "0.0.1");

const statestore = "statestore";
const pubsub = "pubsub";

const people = app.interface("People", {
  get: [
    step(
      "Get state",
      dapr.GetState({
        store: statestore,
        key: "input.id",
        notFoundError: "person_not_found",
      }),
    ),
  ],

  create: [
    step(
      "Save state",
      dapr.SetState({
        store: statestore,
        items: [{
          key: "input.id",
          value: "input",
        }],
      }),
    ),
    step(
      "Publish greeting message",
      dapr.Publish({
        pubsub: pubsub,
        topic: "welcome",
        data: `
{
  "type": "welcome.v1",
  "data": "Welcome, " + input.firstName + " " + input.lastName + "!",
}`,
        codec: "cloudevents+json",
      }),
    ),
    step(
      "201 Created",
      HTTPResponse({
        status: 201,
        headers: [
          {
            name: "Location",
            value: '"{{host}}/people/" + input.id',
          },
        ],
      }),
    ),
  ],
});

const events = app.interface("Events", {
  onWelcome: [
    step(
      "Log the welcome message",
      log("Event received: [%s] %q", "input.type", "input.data"),
    ),
  ],
});

app.authorizations({
  [people.get]: unauthenticated,
  [people.create]: unauthenticated,
});

app.transport(
  "http",
  HttpServerV1({
    address: ":8080",
    routers: [
      RouterV1({
        routes: [
          {
            method: "POST",
            uri: "/people",
            handler: people.create,
          },
          {
            method: "GET",
            uri: "/people/{id}",
            handler: people.get,
          },
        ],
      }),
    ],
  }),
);

app.transport(
  "dapr",
  DaprServerV1({
    address: ":19090",
    subscriptions: [
      {
        pubsub: "pubsub",
        topic: "welcome",
        codec: "cloudevents+json",
        handler: events.onWelcome,
      },
    ],
  }),
);

app.error("person_not_found", {
  type: "PersonNotFound",
  code: "not_found",
  title: "Person not found",
  message: "Person for id {{ .key }} is not found",
});

app.emit();
