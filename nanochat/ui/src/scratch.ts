
import { jots, users } from './openapi';

const me = await users.me();

const global = window as any;

global.users = users;
global.jots = jots;
