import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  if (!global.hasOwnProperty("prismaClient"))
    (global as any).prismaClient = new PrismaClient();

  prismaClient = (global as any).prismaClient;
}

export type PrismaClientType = typeof prismaClient;

export default prismaClient;
