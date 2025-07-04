require('./instrument.js');
const express = require('express');
const http = require('http');
const expressSanitizer = require('express-sanitizer');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('@apollo/server');
const { db, initializeDatabase } = require('./database.js');

const Sentry = require('@sentry/node');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(expressSanitizer());

// HTTP server
const httpServer = http.createServer(app);

const typeDefs = `
  type Query {
    testSentry(input: TestSentryInput!): Boolean!
    testDbError(input: TestDbErrorInput!): Boolean!
  }

  input TestSentryInput {
    foo: [String!]
  }

  input TestDbErrorInput {
    invalidQuery: String
  }
`;

const addUser = async (user) => {
  return await db('users').insert(user);
};

const resolvers = {
  Query: {
    testSentry: (_obj, args) => {
      try {
        args.foo.map((x) => x);
        return true;
      } catch (error) {
        Sentry.captureException(error);
        return false;
      }
    },
    testDbError: async (_obj, args) => {
      try {
        await addUser({ foo: 'bar' });
        return true;
      } catch (error) {
        Sentry.captureException(error);
        return false;
      }
    }
  }
};

const createApolloServer = async (_) => {
  let schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = new ApolloServer({
    schema,
  });

  return apolloServer;
};

(async () => {
  await initializeDatabase();
  const apolloServer = await createApolloServer(httpServer);
  await apolloServer.start();
  app.use(expressMiddleware(apolloServer));
  httpServer.listen(4434);
})().catch(e => { console.log(e); process.exit(1); });

Sentry.setupExpressErrorHandler(app);
