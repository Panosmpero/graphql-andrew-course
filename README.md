to generate the schema from prisma graphql API:
npm install -g get-graphql-schema

add to package.json:
"get-schema": "get-graphql-schema http://localhost:4466 > src/generated/prisma.graphql"

npm run get-schema

OR you can download Schema straight from Prisma GraphQL playground on localhost