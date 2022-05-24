import { User } from ".prisma/client";
import Dataloader from "dataloader";
import prismaClient from "src/prisma/client";

type BatchUser = (ids: ReadonlyArray<number>) => Promise<User[]>;

const userMap = new Map<string, User>();

const batchUsers: BatchUser = async (ids) => {
  const mutableIds = Array.from(ids);
  const users = await prismaClient.user.findMany({
    where: {
      id: {
        in: mutableIds,
      },
    },
  });

  users.forEach((user) => {
    userMap.set(`${user.id}`, user);
  });

  return ids.map((id) => userMap.get(`${id}`)!);
};

export const userLoader = new Dataloader<number, User>(batchUsers);
