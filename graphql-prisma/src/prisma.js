import { Prisma } from "prisma-binding";
// here we store code to connect Node.js to Prisma GraphQL API

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
});

const createPostForUser = async (authorId, data) => {
  try {
    const post = await prisma.mutation.createPost(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      },
      "{ id }"
    );

    const user = await prisma.query.user(
      {
        where: {
          id: authorId,
        },
      },
      "{ id name email posts { id title published } }"
    );

    return user;
  } catch (error) {
    console.log(error);
  }
};

// createPostForUser("ckonllo5v00p30981i3vzz1mt", {
//   title: "Great success post",
//   body: "Post body success?",
//   published: true,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => console.log(error));

const updatePostForUser = async (postId, data) => {
  try {
    const post = await prisma.mutation.updatePost(
      {
        where: {
          id: postId,
        },
        data,
      },
      "{ author { id } }"
    );

    const user = await prisma.query.user(
      {
        where: {
          id: post.author.id,
        },
      },
      "{ id name email posts { id title published } }"
    );

    return user;
  } catch (error) {
    console.log(error);
  }
};

// updatePostForUser("ckonlf5wu00kn0981cdykkyow", {
//   title: "New post title updated",
//   published: false,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => console.log(error));
