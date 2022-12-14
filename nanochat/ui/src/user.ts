import { users } from "./openapi";
import type { User } from "./generated-sources/openapi";


class CurrentUser {
  user: User | null;

  constructor(user: User | null) {
    this.user = user;
  }

  userRecord(): User {
    return this.user!;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  hasToken() {
    const hasToken = document.cookie.match(/sid=(\S*)/) !== null;
    return hasToken;
  }

  handle(): string {
    return this.user?.handle!;
  }

  numFollowers(): number {
    return this.user?.followers!;
  }

  numFollowing(): number {
    return this.user?.follows!;
  }
}

const me: User | null = await users.me().catch(() => null);

export const currentUser = new CurrentUser(me);
