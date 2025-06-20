## GraphQL Express MRE
1. Install dependencies:
   `npm install`
2. Start the server: `npm run start` 
3. Send the following query to `http://localhost:4434/graphql`:
    ```graphql
    query {
        testSentry(input: {})
    }
    ```