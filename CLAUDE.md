
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a minimal GraphQL server with Express designed as a reproducible example for testing Sentry integration. The application demonstrates error handling and monitoring in a GraphQL context.

## Architecture

- **app.js**: Main GraphQL server with Express integration
  - Uses Apollo Server for GraphQL functionality
  - Implements error handling with Sentry integration
  - Two resolvers: `testSentry` and `testDbError` for testing different error scenarios
- **database.js**: Database configuration and initialization
  - Knex configuration for PostgreSQL
  - Simple users table with basic schema
  - Database initialization with sample data
- **instrument.js**: Sentry initialization and configuration
  - Configured for 'mini-testing' environment
  - Includes local variables in error reports
  - Contains DSN configuration for Sentry

## Development Commands

```bash
# Install dependencies
npm install

# Start PostgreSQL database (using Docker)
docker run --name mini-graphql-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mini_graphql_test -p 5432:5432 -d postgres

# Start the GraphQL server (runs on port 4434)
npm start
```

## Testing the Application

1. Install dependencies: `npm install`
2. Start PostgreSQL database: `docker run --name mini-graphql-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mini_graphql_test -p 5432:5432 -d postgres`
3. Start the server with `npm start`
4. Send GraphQL queries to `http://localhost:4434/graphql`

### Test Queries

**Test Sentry error reporting:**
```graphql
query {
  testSentry(input: {})
}
```

**Test database error reporting:**
```graphql
query {
  testDbError(input: {invalidQuery: "test"})
}
```

## Key Dependencies

- **@apollo/server**: GraphQL server implementation
- **express**: Web framework
- **@sentry/node**: Error monitoring and reporting
- **@graphql-tools/schema**: GraphQL schema utilities
- **express-sanitizer**: Input sanitization middleware
- **knex**: SQL query builder for database operations
- **pg**: PostgreSQL database driver

## Important Notes

- The Sentry DSN is configured in `instrument.js` and should be updated for different environments
- Error handling is deliberately implemented to test Sentry integration
- The server runs on port 4434 (not the standard 3000/4000)
- PostgreSQL database connection uses environment variables (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
- Default connection: localhost:5432, database: mini_graphql_test, user: postgres, password: postgres
- Database errors are simulated by invalid insert operations
- The application serves as a test case for different error scenarios in GraphQL context