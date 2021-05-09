import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid";

// String, Boolean, Int, Float, ID

// mock data
let users = [
  {
    id: "1",
    name: "Panos",
    email: "panos@example.com",
    age: 34,
  },
  {
    id: "2",
    name: "Mike",
    email: "mike@example.com",
    age: 44,
  },
  {
    id: "3",
    name: "Kate",
    email: "kate@example.com",
    age: 24,
  },
];

let posts = [
  {
    id: "1",
    title: "Test title 1",
    body: "this is a post body",
    published: false,
    author: "1",
  },
  {
    id: "2",
    title: "This is a title",
    body: "this is a post body",
    published: false,
    author: "1",
  },
  {
    id: "3",
    title: "Graphql",
    body: "Is good",
    published: true,
    author: "3",
  },
  {
    id: "4",
    title: "Post for deletion",
    body: "Needs to be deleted",
    published: true,
    author: "2",
  },
];

let comments = [
  {
    id: "1",
    text: "this is a comment",
    author: "1",
    post: "1",
  },
  {
    id: "2",
    text: "another one",
    author: "1",
    post: "2",
  },
  {
    id: "3",
    text: "third random",
    author: "2",
    post: "3",
  },
  {
    id: "4",
    text: "just some letters",
    author: "3",
    post: "3",
  },
  {
    id: "5",
    text: "another one",
    author: "2",
    post: "2",
  },
];

// Type definitions (schema)
const typeDefs = `
  type Mutation {
    createUser(input: UserInput): User!
    deleteUser(id: ID!): User!
    createPost(input: PostInput): Post!
    deletePost(id: ID!): Post!
    createComment(input: CommentInput): Comment!
    deleteComment(id: ID!): Comment!
  }

  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  input UserInput {
    name: String!
    email: String!
    age: Int
  }

  input PostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {       
    id: ID!         
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, args, ctx, info) => {
      const emailTaken = users.find((user) => user.email === args.input.email);
      if (emailTaken) throw new Error("Email in use");
      const user = {
        id: uuidv4(),
        ...args.input,
      };
      users.push(user);
      return user;
    },
    deleteUser: (parent, args, ctx, info) => {
      const userIndex = users.findIndex((user) => user.id === args.id);
      if (userIndex === -1) throw new Error("User not found");

      // delete user
      const deletedUser = users.splice(userIndex, 1);

      // delete Posts and Comments from that user
      posts = posts.filter((post) => post.author !== args.id);

      comments = comments.filter((comment) => comment.author !== args.id);

      return deletedUser[0];
    },
    createPost: (parent, args, ctx, info) => {
      const userExists = users.find((user) => user.id === args.input.author);
      if (!userExists) throw new Error("User not found");
      const post = {
        id: uuidv4(),
        ...args.input,
      };
      posts.push(post);
      return post;
    },
    deletePost: (parent, args, ctx, info) => {
      const postIndex = posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) throw new Error("Post not found");

      // delete post
      const deletedPost = posts.splice(postIndex, 1);

      // delete comments on the post
      comments = comments.filter((comment) => comment.post !== args.id);

      return deletedPost[0];
    },
    createComment: (parent, args, ctx, info) => {
      const userExists = users.find((user) => user.id === args.input.author);
      const postExists = posts.find(
        (post) => post.id === args.input.post && post.published
      );
      if (!userExists) throw new Error("User not found");
      if (!postExists) throw new Error("Post not found or not published");
      const comment = {
        id: uuidv4(),
        ...args.input,
      };
      comments.push(comment);
      return comment;
    },
    deleteComment: (parent, args, ctx, info) => {
      const commentIndex = comments.findIndex(
        (comment) => comment.id === args.id
      );
      if (commentIndex === -1) throw new Error("Comment not found");

      // delete comment
      const deletedComment = comments.splice(commentIndex, 1);
      return deletedComment[0];
    },
  },
  Query: {
    users: (parent, args, ctx, info) => {
      if (!args.query) return users;
      return users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    posts: (parent, args, ctx, info) => {
      if (!args.query) return posts;
      return posts.filter(
        (posts) =>
          posts.title.toLowerCase().includes(args.query.toLowerCase()) ||
          posts.body.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    comments: (parent, args, ctx, info) => {
      return comments;
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
  },
  Post: {
    author: (parent, args, ctx, info) => {
      // in parent lives Post which was called first
      return users.find((user) => user.id === parent.author);
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts: (parent, args, ctx, info) => {
      return posts.filter((post) => post.author === parent.id);
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author: (parent, args, ctx, info) => {
      return users.find((user) => user.id === parent.author);
    },
    post: (parent, args, ctx, info) => {
      return posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(({ port }) => console.log(`Server running on port: ${port}`));
