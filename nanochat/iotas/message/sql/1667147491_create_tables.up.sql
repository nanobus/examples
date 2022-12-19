CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE message (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    message character varying(280) NOT NULL,
    "time" timestamp with time zone NOT NULL
);

ALTER TABLE ONLY message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
