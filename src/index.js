import { GraphQLServer } from "graphql-yoga";

// Scalar types
// ====================
// String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
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
const resolvers = {
  Query: {
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
