// deno-lint-ignore-file no-explicit-any
import {
  Application,
  Authorization,
  Data,
  Handler,
  Step,
} from "https://deno.land/x/nanobus_config@v0.0.12/mod.ts";

type UUID = string;

interface JotsPostJotArgs {
  message: string;
}

interface JotsGetFeedArgs {
  before?: Date;
  limit: number;
}

interface JotsGetJotArgs {
  id: UUID;
}

interface JotsDeleteJotArgs {
  id: UUID;
}

interface JotsLikeArgs {
  id: UUID;
}

interface JotsUnlikeArgs {
  id: UUID;
}

interface JotsLikesArgs {
  id: UUID;
  pagination: Pagination;
}

interface Pagination {
  offset: number;
  limit: number;
}

interface JotsOper {
  postJot?: (data: Data<JotsPostJotArgs>, vars: any) => Step[];
  getFeed?: (data: Data<JotsGetFeedArgs>, vars: any) => Step[];
  getJot?: (data: Data<JotsGetJotArgs>, vars: any) => Step[];
  deleteJot?: (data: Data<JotsDeleteJotArgs>, vars: any) => Step[];
  like?: (data: Data<JotsLikeArgs>, vars: any) => Step[];
  unlike?: (data: Data<JotsUnlikeArgs>, vars: any) => Step[];
  likes?: (data: Data<JotsLikesArgs>, vars: any) => Step[];
}

interface JotsAuth {
  postJot?: Authorization;
  getFeed?: Authorization;
  getJot?: Authorization;
  deleteJot?: Authorization;
  like?: Authorization;
  unlike?: Authorization;
  likes?: Authorization;
}

export const Jots = {
  postJot: "nanochat.io.v1.jots.Jots::postJot" as Handler,
  getFeed: "nanochat.io.v1.jots.Jots::getFeed" as Handler,
  getJot: "nanochat.io.v1.jots.Jots::getJot" as Handler,
  deleteJot: "nanochat.io.v1.jots.Jots::deleteJot" as Handler,
  like: "nanochat.io.v1.jots.Jots::like" as Handler,
  unlike: "nanochat.io.v1.jots.Jots::unlike" as Handler,
  likes: "nanochat.io.v1.jots.Jots::likes" as Handler,

  register(app: Application, iface: JotsOper): void {
    app.register(
      Jots as unknown as Record<string, Handler>,
      iface as Record<string, (data: any, vars: any) => Step[]>,
    );
  },

  authorize(app: Application, auths: JotsAuth): void {
    app.authorize(
      Jots as unknown as Record<string, Handler>,
      auths as Record<string, Authorization>,
    );
  },
};

interface UsersAuth {
  me?: Authorization;
  getProfile?: Authorization;
  getJots?: Authorization;
  follow?: Authorization;
  unfollow?: Authorization;
  getFollows?: Authorization;
  getFollowers?: Authorization;
}

export const Users = {
  me: "nanochat.io.v1.jots.Users::me" as Handler,
  getProfile: "nanochat.io.v1.jots.Users::getProfile" as Handler,
  getJots: "nanochat.io.v1.jots.Users::getJots" as Handler,
  follow: "nanochat.io.v1.jots.Users::follow" as Handler,
  unfollow: "nanochat.io.v1.jots.Users::unfollow" as Handler,
  getFollows: "nanochat.io.v1.jots.Users::getFollows" as Handler,
  getFollowers: "nanochat.io.v1.jots.Users::getFollowers" as Handler,

  authorize(app: Application, auths: UsersAuth): void {
    app.authorize(
      Users as unknown as Record<string, Handler>,
      auths as Record<string, Authorization>,
    );
  },
};
