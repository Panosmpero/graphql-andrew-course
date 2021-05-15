import { Prisma } from "prisma-binding";
// here we store code to connect Node.js to Prisma GraphQL API

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
});

export default prisma;

// prisma.exists.Comment({
//   id: "ckonlhb3p00m30981qwlpi1nw",
//   author: {
//     id: "ckonlest500ka09818rqutz5j"
//   }
// }).then(result => console.log(result))

// const createPostForUser = async (authorId, data) => {
//   try {
//     const userExists = await prisma.exists.User({
//       id: authorId,
//     });

//     if (!userExists) throw new Error("User not found");

//     const post = await prisma.mutation.createPost(
//       {
//         data: {
//           ...data,
//           author: {
//             connect: {
//               id: authorId,
//             },
//           },
//         },
//       },
//       "{ author { id name email posts { id title published } } }"
//     );

//     return post.author;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// createPostForUser("ckonllo5v00p30981i3vzz1mt", {
//   title: "Great success post 3",
//   body: "Post body success?",
//   published: true,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => console.log(error.message));

// const updatePostForUser = async (postId, data) => {
//   try {
//     const postExists = await prisma.exists.Post({
//       id: postId,
//     });

//     if (!postExists) throw new Error("Post not found");

//     const post = await prisma.mutation.updatePost(
//       {
//         where: {
//           id: postId,
//         },
//         data,
//       },
//       "{ author { id name email posts { id title published } } }"
//     );

//     return post.author;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// updatePostForUser("ckonlf5wu00kn0981cdykkyow", {
//   title: "New post title updated with error handling",
//   published: false,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => console.log(error.message));
