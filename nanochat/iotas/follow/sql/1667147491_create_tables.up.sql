CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE follow (
    follower UUID NOT NULL,
    follows UUID NOT NULL,
    "time" timestamp with time zone NOT NULL
);

ALTER TABLE ONLY follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (follower, follows);

CREATE TABLE follow_user (
    id UUID NOT NULL,
    follows bigint DEFAULT 0,
    followers bigint DEFAULT 0
);

ALTER TABLE ONLY follow_user
    ADD CONSTRAINT follow_user_pkey PRIMARY KEY (id);

CREATE OR REPLACE FUNCTION fn_follow(pFollowerID uuid, pFollowsID uuid) RETURNS BOOLEAN AS $$
DECLARE passed BOOLEAN = false;
BEGIN
	IF NOT EXISTS (SELECT * FROM follow WHERE follower = pFollowerID AND follows = pFollowsID) THEN
        INSERT INTO follow_user (id, followers) VALUES (pFollowsID, 1) ON CONFLICT (id) 
        DO UPDATE SET followers = follow_user.followers + 1;

        INSERT INTO follow_user (id, follows) VALUES (pFollowerID, 1) ON CONFLICT (id) 
        DO UPDATE SET follows = follow_user.follows + 1;

		INSERT INTO follow (follower, follows, "time") VALUES (pFollowerID, pFollowsID, now());

		passed = true;
	END IF;
	RETURN passed;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fn_unfollow(pFollowerID uuid, pFollowsID uuid) RETURNS BOOLEAN AS $$
DECLARE passed BOOLEAN = false;
BEGIN
	IF EXISTS (SELECT * FROM follow WHERE follower = pFollowerID AND follows = pFollowsID) THEN
		DELETE FROM follow WHERE follower = pFollowerID AND follows = pFollowsID;
		UPDATE follow_user SET followers = followers - 1 WHERE id = pFollowsID;
        UPDATE follow_user SET follows = follows - 1 WHERE id = pFollowerID;
		passed = true;
	END IF;
	RETURN passed;
END;
$$ LANGUAGE plpgsql;
