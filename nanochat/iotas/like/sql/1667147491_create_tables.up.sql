CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE likable (
    id UUID NOT NULL,
    likes bigint DEFAULT 0
);

ALTER TABLE ONLY likable
    ADD CONSTRAINT likable_pkey PRIMARY KEY (id);

CREATE TABLE likes (
    likable_id UUID NOT NULL,
    user_id  UUID NOT NULL,
    "time" timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (likable_id, user_id);

CREATE OR REPLACE FUNCTION fn_like(pUserID uuid, pLikableID uuid) RETURNS BOOLEAN AS $$
DECLARE passed BOOLEAN = false;
BEGIN
	IF NOT EXISTS (SELECT * FROM likes WHERE user_id = pUserID AND likable_id = pLikableID) THEN
        INSERT INTO likable (id, likes) VALUES (pLikableID, 1) ON CONFLICT (id)
        DO UPDATE SET likes = likable.likes + 1;

		INSERT INTO likes (user_id, likable_id) VALUES (pUserID, pLikableID);
		passed = true;
	END IF;
	RETURN passed;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fn_unlike(pUserID uuid, pLikableID uuid) RETURNS BOOLEAN AS $$
DECLARE passed BOOLEAN = false;
BEGIN
	IF EXISTS (SELECT * FROM likes WHERE user_id = pUserID AND likable_id = pLikableID) THEN
		DELETE FROM likes WHERE user_id = pUserID AND likable_id = pLikableID;
		UPDATE likable SET likes = likes - 1 WHERE id = pLikableID;
		passed = true;
	END IF;
	RETURN passed;
END;
$$ LANGUAGE plpgsql;
