#!/bin/bash

docker-compose up -d

sleep 30

docker exec mongo1 ./scripts/init-replica.sh