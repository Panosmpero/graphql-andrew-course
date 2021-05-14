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

// prisma.query
//   .comments(null, "{ id text author { id name } post { title } }")
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch((error) => console.log(error));

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Prisma binding post with chaining",
//         body: "Post body from prisma binding with users call",
//         published: true,
//         author: {
//           connect: {
//             id: "ckonlest500ka09818rqutz5j",
//           },
//         },
//       },
//     },
//     "{ id title body published author { name } }"
//   )
//   .then((data) => {
//     console.log(data);

//     // method chaining
//     return prisma.query.users(null, "{ id name posts { id title } }");
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         body: "Updated post body",
//       },
//       where: {
//         id: "ckoow7rut0ayc0981rnmb9n3m",
//       },
//     },
//     "{ id title body published author { name } comments { text } }"
//   )
//   .then((data) => {
//     console.log(data);
//     return prisma.query.posts(null, "{ id title body published }");
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
