import { GraphQLServer } from "graphql-yoga";

// Scalar types
// ====================
// String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "34r3r34f3";
    },
    name() {
      return "Beros!";
    },
    age() {
      return 34;
    },
    employed() {
      return false;
    },
    gpa() {
      return 2.14; // can return null as we did not put ! on typeDefs
    },
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.start(() => console.log("Server running!"));
