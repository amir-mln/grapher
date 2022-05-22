import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers";
import typeDefs from "./graphql/schema";
import prismaClient from "./prisma/client";

const context = { prismaClient };

const server = new ApolloServer({ typeDefs, resolvers, context });

server
  .listen()
  .then(({ url }) => console.log("Running on " + url))
  .catch(() => process.exit(0));
