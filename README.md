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
- Apply the migrations by running `docker compose exec nest npm run migrate-dev`
- Navigate to `localhost:8081/api` to see the Swagger interface
- Navigate to `localhost:8082` to see the web application

**Note**: `GET /todos` requires "authentication" so you must either include an authorization header containing the value 'test' or use swagger UI (top right corner) to add an authorization token ('test').

## Applying migrations

If you make changes to prisma entities you need to apply the migration to the DB. To do so, you should run the command:

- `docker compose exec nest npm run migrate-dev`

Migrations code is **versioned by git**: it can be pushed to the repo so that other devs are able to update their local DB instance according to the changes made by others. Migrations are ran automatically when the app start.

---

# TypeORM vs Prisma: A Comparison

## 1. Domain-Driven Design (DDD) and Object-Oriented Compliance

- **TypeORM:**  
  TypeORM aligns well with DDD principles and object-oriented design. Its entity classes allow you to encapsulate domain logic directly within the models, promoting rich domain modeling. This can be a powerful approach for applications where the domain complexity benefits from such encapsulation.
  - **Drawback:** This flexibility often comes with higher complexity. The configuration options can feel overwhelming, especially for developers new to the library. Additionally, its dynamic nature can sometimes lead to unexpected behavior during runtime.

- **Prisma:**  
  Prisma takes a more functional and schema-first approach. By relying on the schema definition, it abstracts much of the complexity of database interactions. However, this does mean you lose the ability to embed domain logic directly within entities. Instead, you rely on DTOs and services to handle domain-specific transformations and logic.  
  - This is less OO-compliant but arguably more modern and in line with best practices for microservices or serverless architectures, where simplicity and clear separation of concerns are prioritized.

## 2. Setup and Configuration

- **TypeORM:**  
  Its broad configuration options can be both a blessing and a curse. While it supports various databases, relationships, and customizations out of the box, it can feel verbose and less intuitive. Managing migrations, in particular, requires more manual effort and understanding of the internals.
- **Prisma:**  
  Prisma's declarative configuration through its schema file is a standout feature. The developer experience is streamlined, especially with features like automated migrations, type-safe Prisma Client generation, and intuitive querying syntax. It simplifies the setup process and is ideal for teams prioritizing quick iteration and developer productivity.

## 3. Migrations

- Prisma's migration system is user-friendly and integrates seamlessly with its schema-first approach. You define your data model, and Prisma generates the migration scripts for you.  
- TypeORM offers both automatic and manual migrations. It requires more discipline from developers to manage migrations effectively.

## 4. DTOs and Code Generation

- **Prisma:**  
  Using DTOs is almost mandatory. The generated client code is immutable and tightly coupled to the database schema, encouraging separation between the persistence layer and application logic. This does make sense as it enforces clean architecture principles, even if it requires more boilerplate upfront.
- **TypeORM:**  
  With TypeORM, developers often bypass DTOs and rely on base entities, which can blur the lines between the persistence and application layers. While this reduces initial setup time, it can lead to less maintainable code in the long run.

## 5. Adherence to Design Patterns

Both libraries allow adherence to design patterns, but the emphasis differs:

- **TypeORM:** Stronger alignment with traditional patterns like Repository and Active Record.
- **Prisma:** Encourages more modern patterns, such as CQRS (Command Query Responsibility Segregation), by naturally separating queries and mutations.

## 6. Performance

- Prisma’s generated queries are optimized and type-safe, but its abstraction might introduce slight overhead compared to raw queries or a more fine-tuned ORM like TypeORM.
- TypeORM offers more control over query optimization but requires the developer to handle it explicitly, which can lead to performance pitfalls if not done correctly.

## Final Thoughts

- **TypeORM is better if** you prefer a traditional ORM with strong OO principles and need rich domain models with embedded logic. It’s well-suited for applications where the domain complexity justifies this approach.
- **Prisma is better if** you prioritize developer experience and you handly domain models with poor or none embedded logic. It’s ideal for rapid development, especially in API-driven architectures.

In the context of IngSw2024 team, **Prisma** might be the best tradeoff in order to speed up development and provide an easier interface to the data layer. Anyway, in case issues arised, a migration from Prisma to TypeORM wouldn't be problematic if the team enforces correct OO and DRY principles since the early stages of the development process.

