# Drop all IOta databases

docker exec -it postgresql psql -U postgres -c "DROP DATABASE iota_follow WITH (FORCE);"
docker exec -it postgresql psql -U postgres -c "DROP DATABASE iota_like WITH (FORCE);"
docker exec -it postgresql psql -U postgres -c "DROP DATABASE iota_message WITH (FORCE);"
docker exec -it postgresql psql -U postgres -c "DROP DATABASE iota_user WITH (FORCE);"
