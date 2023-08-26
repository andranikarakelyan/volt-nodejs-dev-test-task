# volt-nodejs-dev-test-task

Interview task of wearevolt.com

## How to run with docker
```shell
docker-compose up -d --build
```

## Configuration

You can view and change all environment variables in file *.env*. Default config is
```shell
SERVER_PORT=4000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=volt-task-db
POSTGRES_HOST=volt-task-db # use 'localhost' to access from outside
POSTGRES_PORT=4001
```

### How to run server in local
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

