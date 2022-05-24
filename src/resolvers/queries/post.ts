import withResolverProps from "src/utils/with-resolver-props";
import type { Post, User } from "@prisma/client";

export default {
  user: withResolverProps<{ source: Post }, Promise<User | null>>(
    async ({ source: { authorId }, context: { prismaClient } }) =>
      await prismaClient.user.findUnique({ where: { id: authorId } })
  ),
};
