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
  createPost: (parent, args, { db }, info) => {
    const userExists = db.users.find((user) => user.id === args.input.author);
    if (!userExists) throw new Error("User not found");
    const post = {
      id: uuidv4(),
      ...args.input,
    };
    db.posts.push(post);
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
  createComment: (parent, args, { db }, info) => {
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
};
