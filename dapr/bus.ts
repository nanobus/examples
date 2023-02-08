#!/usr/bin/env -S deno run
import {
  Application,
  codecs,
  dapr,
  DaprServerV1,
  Events,
  HTTPResponse,
  log,
  People,
  RestModule,
  unauthenticated,
} from "./iota.ts";

const app = new Application("dapr-example", "0.0.1")
  .spec("apex.axdl")
  .use(new RestModule(":8080"));

const statestore = "statestore";
const pubsub = "pubsub";

app.transport(
  "dapr",
  DaprServerV1({
    address: ":19090",
    subscriptions: [
      {
        pubsub: "pubsub",
        topic: "welcome",
        codec: codecs.CloudEventsJSON,
        handler: Events.onWelcome,
      },
    ],
  }),
);

People.authorize(app, {
  get: unauthenticated,
  create: unauthenticated,
});

People.register(app, {
  get: ({ input, flow }) =>
    flow.then(
      "Get state",
      () =>
        dapr.GetState({
          store: statestore,
          key: input.id,
          notFoundError: "person_not_found",
        }),
    ),

  create: ({ input, flow }) =>
    flow.then(
      "Save state",
      () =>
        dapr.SetState({
          store: statestore,
          items: [{
            key: input.id,
            value: "input",
          }],
        }),
    ).then(
      "Publish greeting message",
      () =>
        dapr.Publish({
          pubsub: pubsub,
          topic: "welcome",
          data: `
{
  "type": "welcome.v1",
  "data": {
    "message": "Welcome, " + ${input.firstName} + " " + ${input.lastName} + "!",
  },
}`,
          codec: codecs.CloudEventsJSON,
        }),
    ).then(
      "201 Created",
      () =>
        HTTPResponse({
          status: 201,
          headers: [
            {
              name: "Location",
              value: `"{{host}}/people/" + ${input.id}`,
            },
          ],
        }),
    ),
});

Events.register(app, {
  onWelcome: ({ input, flow }) =>
    flow.then(
      "Log the welcome message",
      () => log("Event received: [%s] %q", input.type, input.data.message),
    ),
});

app.error("person_not_found", {
  type: "PersonNotFound",
  code: "not_found",
  title: "Person not found",
  message: "Person for id {{ .key }} is not found",
});
