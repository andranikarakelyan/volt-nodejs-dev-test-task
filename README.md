# volt-nodejs-dev-test-task

Interview task of wearevolt.com

# Quick start

```shell
# Run all services at once
docker-compose up -d --build
```

```shell
# Fill databases
npm i
npm run fill-db
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

## Testing

Now testing flow not configured. "development" and "test" databases are the same. Implemented few tests you can run
```shell
npm i
npm test
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
# To access from "outside" connect to {POSTGRES_PUBLIC_HOST}:{POSTGRES_PUBLIC_PORT}.
POSTGRES_PUBLIC_USER=postgres
POSTGRES_PUBLIC_PASSWORD=postgres
POSTGRES_PUBLIC_DB=volt-task-db
POSTGRES_PUBLIC_HOST=localhost
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

# AWS S3 credentials. You can save it .local.env file either
AWS_REGION=<your region>
AWS_BUCKET=<your bucket>
AWS_ACCESS_KEY_ID=<your access key id>
AWS_SECRET_ACCESS_KEY=<your access key>
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

