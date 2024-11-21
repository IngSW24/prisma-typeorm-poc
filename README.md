# NestJS Example APP (with Prisma)

Using:

- NestJS + Swagger + **Prisma** with migrations
- React for the web application
- Docker for containerization
- docker-compose for local development and production orchestration
- GithubCI pipelines for docker image build process on tag push

## How to

- Ensure [Docker](https://www.docker.com/) is installed on your machine
- Copy `.env.example` by running `cp .env.example .env`
- Start the stack by running `docker compose up`
    - (this will take a bunch of minutes the first time since it has to build images, then it will be faster)
- Navigate to `localhost:8081/api` to see the Swagger interface
- Navigate to `localhost:8082` to see the web application

**Note**: `GET /todos` requires "authentication" so you must either include an authorization header containing the value 'test' or use swagger UI (top right corner) to add an authorization token ('test').

## Applying migrations

If you make changes to prisma entities you need to apply the migration to the DB. To do so, you should run the command:

- `docker compose exec nest npm run migrate-dev`

Migrations code is **versioned by git**: it can be pushed to the repo so that other devs are able to update their local DB instance according to the changes made by others. Migrations are ran automatically when the app start.

---

# Prisma vs TypeORM

TODO
