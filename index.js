import { ApolloServer } from "apollo-server";

import resolvers from "./resolvers/index.js";
import typeDefs from "./schema/index.js";
import context from "./database/index.js";

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => console.log("running at " + url));
