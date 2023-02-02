# GitHub Star Webhook

Example of a GitHub webhook and Discord bot that sends a message to Discord when a user stars a GitHub repository.

# Setup

Create a file called `.env` and add the following variable names.

```
WEBHOOK_URI=/
DISCORD_BOT_TOKEN=
DISCORD_CHANNEL_ID=
```

## Discord Bot

[These instructions](https://www.ionos.com/digitalguide/server/know-how/creating-discord-bot/) will walk you through creating your Bot and adding it to a server. For **Scopes** select "bot" and **Bot Permissions** choose "Send Messages."

After enabling Developer Mode in Discord, you can get the channel ID by right-clicking the channel and selecting "Copy ID."

## GitHub Webhook

Next, you set `WEBHOOK_URI` to be `/[some secret characters]`. Once hosted at a public address, this is the URI you will configure as the **Payload URL** of your GitHub webhook. For **Content type**, select `application/json`. Then pick "Let me select individual events" and only check **Stars**. When you are ready, press **Add webhook**.

# Running

```shell
deno run --allow-write bus.ts bus.yaml
nanobus run --debug --developer-mode
```

# Testing

The Discord configuration is testable locally using CURL. Set `$WEBHOOK_URI` accordingly.

```shell
curl -L -X POST 'http://localhost:8080/$WEBHOOK_URI' \
-H 'Content-Type: application/json' \
--data-raw '{
 "action": "create",
 "repository": {
 "full_name": "nanobus/nanobus"
 },
 "sender": {
 "login": "octocat"
 }
}'
```

# Deployment

[Deploy NanoBus](https://nanobus.io/deployment-options) application exposed to the public internet and point the GitHub Webhook to the public URL.
