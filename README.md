# NestJS Example APP

Using:

- Swagger
- TypeORM with migrations

## How to

### Running on local machine

- Copy `.env.example` by running `cp .env.example .env`
- Install dependencies by running `npm i`
- Start the database by running `docker compose up db`
- Start the API in watch mode by running `npm run start:dev`
- Navigate to `localhost:3000/api` to see the Swagger interface

### Running with docker compose

- Ensure [Docker](https://www.docker.com/) is installed on your machine
- Copy `.env.compose.example` by running `cp .env.compose.example .env`
- Start the stack by running `docker compose up`
    - (this will take a bunch of minutes the first time since it has to build images, then it will be faster)
- Navigate to `localhost:8081/api` to see the Swagger interface

**Note**: `GET /todos` requires "authentication" so you must either include an authorization header containing the value 'test' or use swagger UI (top right corner) to add an authorization token ('test').

## Applying migrations

If you make changes to `src/todo/todo.entity.ts` you need to apply the migration to the DB. To do so, you should: 

- Generate a new migration by running `npm run migration:generate NameOfMigration`
- Apply the migration by restarting the app or by running `npm run migration:run`

Migrations code is **versioned by git**: it can be pushed to the repo so that other devs are able to update their local DB instance according to the changes made by others. Migrations are ran automatically when the app start.

