#!/bin/bash

# Create "follow" IOta database

docker exec -it postgresql psql -U postgres -c "CREATE DATABASE iota_follow;"
docker exec -it postgresql psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE iota_follow TO postgres;"

# Create "like" IOta database

docker exec -it postgresql psql -U postgres -c "CREATE DATABASE iota_like;"
docker exec -it postgresql psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE iota_like TO postgres;"

# Create "message" IOta database

docker exec -it postgresql psql -U postgres -c "CREATE DATABASE iota_message;"
docker exec -it postgresql psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE iota_message TO postgres;"

# Create "user" IOta database

docker exec -it postgresql psql -U postgres -c "CREATE DATABASE iota_user;"
docker exec -it postgresql psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE iota_user TO postgres;"
