import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import resolvers from "./resolvers";
import "./prisma"

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    pubsub
  },
});

server.start(({ port }) => console.log(`Server running on port: ${port}`));
