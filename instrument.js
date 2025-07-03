const Sentry = require('@sentry/node');

Sentry.init({
  environment: 'testing',
  includeLocalVariables: true,
  debug: true,
});
