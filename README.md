# NestJS Example APP

Using:

- Swagger
- TypeORM with migrations

## How to

- Copy `.env.example` by running `cp .env.example .env`
- Start the database by running `docker compose up`
- Migrate the DB my running `npm run typeorm:migration run -- -d typeorm.config.ts`
- Start the API in watch mode by running `npm run start:dev`
- Navigate to `localhost:3000/api` to see the Swagger interface

## Applying migrations

If you make changes to `src/todo/todo.entity.ts` you need to apply the migration to the DB. To do so, you should: 

- Generate a new migration by running `npm run typeorm:migration generate ./migrations/NameOfMigration -- -d typeorm.config.ts`
- Apply the migration by running `npm run typeorm:migration run -- -d typeorm.config.ts`

Migrations code is versioned by git so it can be pushed to the repo so that other devs are able to update their local DB instance according to the changes made by others


