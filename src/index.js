import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID

// mock data
const users = [
  {
    id: 1,
    name: "Panos",
    email: "panos@example.com",
    age: 34,
  },
  {
    id: 2,
    name: "Mike",
    email: "mike@example.com",
    age: 44,
  },
  {
    id: 3,
    name: "Kate",
    email: "kate@example.com",
    age: 24,
  },
];

const posts = [
  {
    id: 1,
    title: "Test title 1",
    body: "this is a post body",
    published: false,
    author: 1,
  },
  {
    id: 2,
    title: "This is a title",
    body: "this is a post body",
    published: false,
    author: 1,
  },
  {
    id: 3,
    title: "Graphql",
    body: "Is good",
    published: true,
    author: 2,
  },
];

const comments = [
  {
    id: 1,
    text: "this is a comment",
    author: 1,
    post: 1,
  },
  {
    id: 2,
    text: "another one",
    author: 1,
    post: 2,
  },
  {
    id: 3,
    text: "third random",
    author: 2,
    post: 3,
  },
  {
    id: 4,
    text: "just some letters",
    author: 3,
    post: 3,
  },
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
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
