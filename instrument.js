const Sentry = require('@sentry/node');

Sentry.init({
  dsn: '', // INSERT DSN HERE
  environment: process.env.APP_ENV,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
  debug: true,
});
