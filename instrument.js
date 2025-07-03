const Sentry = require('@sentry/node');

Sentry.init({
  environment: 'mini-testing',
  includeLocalVariables: true,
});
