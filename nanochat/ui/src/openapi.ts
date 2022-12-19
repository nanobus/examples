
import { Configuration, JotsApi, UsersApi } from './generated-sources/openapi/'
export * from './generated-sources/openapi';

const configuration = new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include"
});

export const jots = new JotsApi(configuration);

export const users = new UsersApi(configuration);