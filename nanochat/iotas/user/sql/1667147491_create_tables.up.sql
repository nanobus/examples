CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    handle character varying(64) NOT NULL,
    email character varying(256) NOT NULL
);

ALTER TABLE ONLY "user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

CREATE TABLE session (
    sid UUID NOT NULL,
    uid UUID NOT NULL REFERENCES "user"(id),
    access_token character varying(5000) NOT NULL,
    expiry timestamp with time zone NOT NULL,
    refresh_token character varying(5000),
    token_type character varying(64) NOT NULL
);

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
