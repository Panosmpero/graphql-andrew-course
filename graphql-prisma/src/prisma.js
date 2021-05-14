import { Prisma } from "prisma-binding";
// here we store code to connect Node.js to Prisma GraphQL API

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
});

// prisma.query
//   .users(null, "{ id name email posts { id title } }")
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch((error) => console.log(error));

prisma.query
  .comments(null, "{ id text author { id name } post { title } }")
  .then((data) => {
    console.log(JSON.stringify(data, undefined, 2));
  })
  .catch((error) => console.log(error));
