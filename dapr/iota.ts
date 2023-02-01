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
  WelcomeEvent: "dapr-example::WelcomeEvent" as Entity,
  Message: "dapr-example::Message" as Entity,
  Person: "dapr-example::Person" as Entity
};

export interface PeopleGetArgs {
  id: string;
}

export interface PeopleOper {
  create?: Flow<Person> | Step[];
  get?: Flow<PeopleGetArgs> | Step[];
}

export interface PeopleAuth {
  create?: Authorization;
  get?: Authorization;
}

export const People = {
  $interface: "dapr-example.People",
  create: "dapr-example.People::create" as Handler,
  get: "dapr-example.People::get" as Handler,

  register(app: Application, iface: PeopleOper): void {
    app.interface(People.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: PeopleAuth): void {
    app.authorize(People.$interface, auths as Record<string, Authorization>);
  }
};

export const peopleClient = {
  create(person: Person): Response<unknown> {
    const dataExpr = `{
 "person": ${toDataExpr(person)}
}`;
    return callInterface(People.create, dataExpr) as Response<unknown>;
  },

  get(id: string): Response<Person> {
    const dataExpr = `{
 "id": ${toDataExpr(id)}
}`;
    return callInterface(People.get, dataExpr) as Response<Person>;
  }
};

export interface EventsOper {
  onWelcome: Flow<WelcomeEvent> | Step[];
}

export interface EventsAuth {
  onWelcome?: Authorization;
}

export const Events = {
  $interface: "dapr-example.Events",
  onWelcome: "dapr-example.Events::onWelcome" as Handler,

  register(app: Application, iface: EventsOper): void {
    app.interface(Events.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: EventsAuth): void {
    app.authorize(Events.$interface, auths as Record<string, Authorization>);
  }
};

export const eventsClient = {
  onWelcome(event: WelcomeEvent): Response<unknown> {
    const dataExpr = `{
 "event": ${toDataExpr(event)}
}`;
    return callInterface(Events.onWelcome, dataExpr) as Response<unknown>;
  }
};

export interface WelcomeEvent {
  type: string;
  time: Date;
  data: Message;
}

export interface Message {
  message: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

export const interfaces = {
  People,
  Events
};
