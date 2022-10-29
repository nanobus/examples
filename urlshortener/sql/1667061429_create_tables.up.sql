CREATE TABLE url (
	id varchar(16) PRIMARY KEY,
	url varchar(4096) NOT NULL
);

CREATE UNIQUE INDEX url_url_uq ON url(url);
