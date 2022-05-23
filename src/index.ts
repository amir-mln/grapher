import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers";
import typeDefs from "./graphql/schema";
import prismaClient from "./prisma/client";
import { JWT_SECRET } from "./utils/secrets";

import type { ExpressContext } from "apollo-server-express";

export type ApolloContext = ReturnType<typeof context>;
export type UserOfContext = { userId: number } | null;

const context = ({ req, res }: ExpressContext) => {
  const token = req.headers.authorization || "";
  let user: UserOfContext;

  try {
    user = jwt.verify(token, JWT_SECRET) as UserOfContext;
  } catch {
    user = null;
  }

  return { prismaClient, user, res };
};

const server = new ApolloServer({ typeDefs, resolvers, context });

server
  .listen()
  .then(({ url }) => console.log("Running on " + url))
  .catch(() => process.exit(0));
