# Mini GraphQL

Minimal GraphQL server with Express for testing Sentry integration and database errors.

## Quick Start

1. Start PostgreSQL database:
   ```bash
   docker run --name mini-graphql-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mini_graphql_test -p 5432:5432 -d postgres
   ```

2. Install dependencies and start server:
   ```bash
   npm install
   npm start
   ```

3. Test GraphQL queries at `http://localhost:4434/graphql`:

   **Test Sentry error:**
   ```graphql
   query {
     testSentry(input: {})
   }
   ```

   **Test database error:**
   ```graphql
   query {
     testDbError(input: {invalidQuery: "test"})
   }
   ```