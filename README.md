# volt-nodejs-dev-test-task

Interview task of wearevolt.com

# Quick start

## How to run with docker
```shell
docker-compose up -d --build
```

## How to see/use quickly
```yaml
graphql playground:
  url: http://localhost:4000/api/graphql

Postgres database:
  host: postgresql://localhost:4001/postgres
  username: postgres
  password: postgres

Redis:
  host: redis://localhost:4002/0
  port: 4002
  user: # Empty
  password: redis
```

# Additional info

## Configuration

You can view and change all environment variables in file *.env*. Default config is
```shell
# Server port. Access via http://localhost:{SERVER_PORT}
SERVER_PORT=4000

# Server's credentials to connect to database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=volt-task-db
POSTGRES_HOST=volt-task-postgres
POSTGRES_PORT=5432

# For development purposes, "public" port of postgres inside the docker.
# To access from "outside" connect to localhost:{POSTGRES_PUBLIC_PORT}.
# Username, password, db you can get from variables above
POSTGRES_PUBLIC_PORT=4001

# Server's credentials to connect to redis
REDIS_HOST=volt-task-redis
REDIS_PORT=6379
REDIS_PASSWORD=some-password

# For development purposes, "public" port of redis inside the docker.
# To access from "outside" connect to localhost:{REDIS_PUBLIC_PORT}.
# Username, password, db you can get from variables above
REDIS_PUBLIC_PORT=4002

# Auth
JWT_SECRET=some-secret
```

## How to run server in local
```shell
# Production
npm install
npm run build
npm start
```
```shell
# Development
npm install
npm run dev
```

