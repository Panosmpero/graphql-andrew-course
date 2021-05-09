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
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: post,
        },
      });
    }

    return post;
  },

  deletePost: (parent, args, { db, pubsub }, info) => {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) throw new Error("Post not found");

    // delete post
    const [post] = db.posts.splice(postIndex, 1);

    // delete comments on the post
    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: post,
        },
      });
    }

    return post;
  },

  updatePost: (parent, { id, input }, { db, pubsub }, info) => {
    const post = db.posts.find((post) => post.id === id);

    if (!post) throw new Error("Post not found");

    if (typeof input.title === "string") post.title = input.title;
    if (typeof input.body === "string") post.body = input.body;
    if (typeof input.published === "boolean") {
      if (post.published && !input.published) {
        post.published = input.published;

        pubsub.publish("post", {
          post: {
            mutation: "UNPUBLISHED",
            data: post,
          },
        });
      } else if (!post.published && input.published) {
        post.published = input.published;

        pubsub.publish("post", {
          post: {
            mutation: "PUBLISHED",
            data: post,
          },
        });
      } else if (input.published) {
        pubsub.publish("post", {
          post: {
            mutation: "UPDATED",
            data: post,
          },
        });
      }
    } else if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: post,
        },
      });
    }

    return post;
  },

  createComment: (parent, { input }, { db, pubsub }, info) => {
    const userExists = db.users.find((user) => user.id === input.author);
    const postExists = db.posts.find(
      (post) => post.id === input.post && post.published
    );

    if (!userExists) throw new Error("User not found");
    if (!postExists) throw new Error("Post not found or not published");

    const comment = {
      id: uuidv4(),
      ...input,
    };
    db.comments.push(comment);

    pubsub.publish(`comment ${input.post}`, {
      comment: {
        mutation: "CREATED",
        data: comment,
      },
    });

    return comment;
  },

  deleteComment: (parent, { id }, { db, pubsub }, info) => {
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);

    if (commentIndex === -1) throw new Error("Comment not found");

    // delete comment
    const [comment] = db.comments.splice(commentIndex, 1);

    pubsub.publish(`comment ${id}`, {
      comment: {
        mutation: "DELETED",
        data: comment,
      },
    });

    return comment;
  },

  updateComment: (parent, { id, input }, { db, pubsub }, info) => {
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) throw new Error("Comment not found");

    if (typeof input.text === "string") comment.text = input.text;

    pubsub.publish(`comment ${id}`, {
      comment: {
        mutation: "UPDATED",
        data: comment,
      },
    });

    return comment;
  },
};
