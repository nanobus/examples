# Ory Hydra Setup

<img src="https://i.ytimg.com/vi/BDzoHT0E8SE/maxresdefault.jpg" />

The following are instructions for running Ory Hydra inside Docker and setting up a client for this URL shortener service.

Mac/Linux: Make sure required ports are not being used

```
sudo netstat -atuln | grep '9000\|9001\|9010\|9020'
```

Create network for Hydra

```
docker network create hydranet
```

```
docker run --network hydranet \
  --name ory-hydra-example--postgres \
  -e POSTGRES_USER=hydra \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=hydra \
  -d postgres:9.6
```

```
export SECRETS_SYSTEM=$(export LC_CTYPE=C; cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
```

```
export DSN=postgres://hydra:secret@ory-hydra-example--postgres:5432/hydra?sslmode=disable
```

```
docker run -it --rm \
  --network hydranet \
  oryd/hydra:v1.11.2 \
  migrate sql --yes $DSN
```

Run Hydra!

```
docker run -d \
  --name ory-hydra-example--hydra \
  --network hydranet \
  -p 9000:4444 \
  -p 9001:4445 \
  -e STRATEGIES_ACCESS_TOKEN=jwt \
  -e SECRETS_SYSTEM=$SECRETS_SYSTEM \
  -e DSN=$DSN \
  -e URLS_SELF_ISSUER=http://127.0.0.1:9000/ \
  -e URLS_CONSENT=http://127.0.0.1:9020/consent \
  -e URLS_LOGIN=http://127.0.0.1:9020/login \
  oryd/hydra:v1.11.2 serve all --dangerous-force-http
```

Run the example "consent" application. This likely needs retrofitting.

```
docker run -d \
  --name ory-hydra-example--consent \
  -p 9020:3000 \
  --network hydranet \
  -e HYDRA_ADMIN_URL=http://ory-hydra-example--hydra:4445 \
  -e NODE_TLS_REJECT_UNAUTHORIZED=0 \
  oryd/hydra-login-consent-node:v1.10.2
```

Create an OAuth client

```
docker run --rm -it \
  --network hydranet \
  oryd/hydra:v1.11.2 \
  clients create \
    --endpoint http://ory-hydra-example--hydra:4445 \
    --id url-shortener \
    --secret consumer-secret \
    -g client_credentials,authorization_code,refresh_token \
    -r token,code,id_token \
    --scope openid,offline \
    --callbacks http://127.0.0.1:9010/callback \
    --callbacks https://oauth.pstmn.io/v1/callback
```

App that generates a token via browser then quits

```
docker run --rm -it \
  --network hydranet \
  -p 9010:9010 \
  oryd/hydra:v1.11.2 \
  token user \
    --port 9010 \
    --auth-url http://127.0.0.1:9000/oauth2/auth \
    --token-url http://ory-hydra-example--hydra:4444/oauth2/token \
    --client-id url-shortener \
    --client-secret consumer-secret \
    --scope openid,offline \
    --redirect http://127.0.0.1:9010/callback
```

Delete a client (don't do this before running the example)

```
docker run --rm -it --network hydranet oryd/hydra:v1.11.2 clients delete url-shortener --endpoint http://ory-hydra-example--hydra:4445
```
