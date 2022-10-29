# NanoBus / IOta examples

* [URL Shortener](./urlshortener/) - An API that shortens URLs and showcases practical use of [Postgres](https://www.postgresql.org), [Redis](https://redis.com), [Kafka](https://kafka.apache.org), [CloudEvents](https://cloudevents.io) and [OAuth](https://oauth.net)/[ODIC](https://openid.net/connect/)/[JWT](https://jwt.io).

We're just getting started. More to come!

## Setup

### Install Apex and NanoBus

NanoBus application are generated using [Apex](https://apexlang.io). The [documentation](https://apexlang.io/docs/getting-started#cli) goes over installation and offers a tutorial.

Next, from a terminal, install NanoBus code generators for Apex.

```cli
git clone https://github.com/nanobus/iota.git
cd iota/codegen
just install
just apex-install
```

Note: The above step will be simplified once these packages are published to [NPM](https://www.npmjs.com).

Now you'll want to install the NanoBus runtime (this repo). You can build from source or [install a release](./install/README.md).

```cli
git clone https://github.com/nanobus/nanobus.git
cd nanobus
make install
```

Generated projects use [`just`](https://github.com/casey/just#packages), an alternative to `make`, to build.
