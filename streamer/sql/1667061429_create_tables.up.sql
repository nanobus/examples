create extension "uuid-ossp";

CREATE TABLE customer (
	id UUID PRIMARY KEY,
	first_name varchar(4096) NOT NULL,
	last_name varchar(4096) NOT NULL
);

INSERT INTO customer (id, first_name, last_name) VALUES
('78fc2068-c54c-471c-a18a-13fae89ca51e', 'Odin', 'Borson'),
('93d67a30-27a5-44f5-b608-4d5bb58a467f', 'Thor', 'Odinson'),
('7caaadc0-473b-4ac2-bbbb-0d462790f6a4', 'Loki', 'Laufeyson/Odinson');
