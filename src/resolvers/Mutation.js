import uuidv4 from "uuid";

export default {
  createUser: (parent, args, { db }, info) => {
    const emailTaken = db.users.find((user) => user.email === args.input.email);

    if (emailTaken) throw new Error("Email in use");

    const user = {
      id: uuidv4(),
      ...args.input,
    };
    db.users.push(user);

    return user;
  },

  deleteUser: (parent, args, { db }, info) => {
    const userIndex = db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) throw new Error("User not found");

    // delete user
    const deletedUser = db.users.splice(userIndex, 1);

    // delete Posts and Comments from that user
    db.posts = db.posts.filter((post) => post.author !== args.id);

    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deletedUser[0];
  },

  updateUser: (parent, { id, input }, { db }, info) => {
    const user = db.users.find((user) => user.id === id);

    if (!user) throw new Error("User not found");

    if (typeof input.email === "string") {
      const emailTaken = db.users.find((user) => user.email === input.email);
      if (emailTaken) throw new Error("Email in use");
      user.email = input.email;
    }
    if (typeof input.name === "string") user.name = input.name;
    // we want to include null
    if (typeof input.age !== "undefined") user.age = input.age;

    return user;
  },

  createPost: (parent, args, { db, pubsub }, info) => {
    const userExists = db.users.find((user) => user.id === args.input.author);

    if (!userExists) throw new Error("User not found");

    const post = {
      id: uuidv4(),
      ...args.input,
    };
    db.posts.push(post);

    if (args.input.published) {
      pubsub.publish("post", { post });
    }

    return post;
  },

  deletePost: (parent, args, { db }, info) => {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) throw new Error("Post not found");

    // delete post
    const deletedPost = db.posts.splice(postIndex, 1);

    // delete comments on the post
    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    return deletedPost[0];
  },

  updatePost: (parent, { id, input }, { db }, info) => {
    const post = db.posts.find((post) => post.id === id);

    if (!post) throw new Error("Post not found");

    if (typeof input.title === "string") post.title = input.title;
    if (typeof input.body === "string") post.body = input.body;
    if (typeof input.published === "boolean") post.published = input.published;

    return post;
  },

  createComment: (parent, args, { db, pubsub }, info) => {
    const userExists = db.users.find((user) => user.id === args.input.author);
    const postExists = db.posts.find(
      (post) => post.id === args.input.post && post.published
    );

    if (!userExists) throw new Error("User not found");
    if (!postExists) throw new Error("Post not found or not published");

    const comment = {
      id: uuidv4(),
      ...args.input,
    };
    db.comments.push(comment);

    pubsub.publish(`comment ${args.input.post}`, { comment });

    return comment;
  },

  deleteComment: (parent, args, { db }, info) => {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) throw new Error("Comment not found");

    // delete comment
    const deletedComment = db.comments.splice(commentIndex, 1);

    return deletedComment[0];
  },

  updateComment: (parent, { id, input }, { db }, info) => {
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) throw new Error("Comment not found");

    if (typeof input.text === "string") comment.text = input.text;

    return comment;
  },
};
