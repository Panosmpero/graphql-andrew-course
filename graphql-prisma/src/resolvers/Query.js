export default {
  users: (parent, args, { prisma }, info) => {
    const operationArgs = {};

    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(operationArgs, info);
  },

  posts: (parent, args, { prisma }, info) => {
    const operationArgs = {};

    if (args.query) {
      operationArgs.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.posts(operationArgs, info);
  },

  comments: (parent, args, { db }, info) => {
    return db.comments;
  },

  me() {
    return {
      id: "e23e2ee2",
      name: "beros",
      email: "beros@beros.com",
    };
  },

  post() {
    return {
      id: "e23e2122321313212ee2",
      title: "GraphQL",
      body: "It's good!",
      published: false,
    };
  },
};
