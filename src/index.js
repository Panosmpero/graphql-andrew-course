import { GraphQLServer } from "graphql-yoga";

// Scalar types
// ====================
// String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }

  type User {       
    id: ID!         
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;
// type User in not Scalar so we need to access it
// when calling it me{}

// Resolvers
/* 
4 arguments passed down to resolver functions
Query: {
  resolverFunction(parent, args, ctx, info) {

  }
}
*/
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      // console.log(args);
      return `Hello ${args.name ? args.name : "User"}, you are my favorite ${
        args.position ? args.position : ""
      }`;
    },
    add(parent, args, ctx, info) {
      // console.log(args)
      return args.a + args.b;
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
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(() => console.log("Server running!"));
