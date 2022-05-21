import { ApolloServer, gql } from "apollo-server";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log("Running on " + url))
  .catch(() => process.exit(0));
