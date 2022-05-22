import type { PrismaClientType } from "src/prisma/client";

import Mutation from "./mutations";
import Query from "./queries";

export type ResolverProps<Source = any, Args = any, Context = {}> = [
  Source,
  Args,
  Context & { prismaClient: PrismaClientType }
];

export default { Query, Mutation };
