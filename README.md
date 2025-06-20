## GraphQL Express MRE
1. Install dependencies:
   `npm install` 
2. Add your Sentry DSN to `instrument.js`
3. Start the server: `npm run start` 
4. Send the following query to `http://localhost:4434/graphql`:
    ```graphql
    query {
        testSentry(input: {})
    }
    ```