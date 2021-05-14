export default {
  users: (parent, args, { db }, info) => {
    if (!args.query) return db.users;
    return db.users.filter((user) =>
      user.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  posts: (parent, args, { db }, info) => {
    if (!args.query) return db.posts;
    return db.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
    );
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
