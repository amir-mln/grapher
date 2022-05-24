import { Profile, User } from "@prisma/client";
import withResolverProps from "src/utils/with-resolver-props";

export default {
  user: withResolverProps<{ source: Profile }, Promise<User | null>>(
    async ({ source: { userId }, context: { prismaClient } }) =>
      await prismaClient.user.findUnique({ where: { id: userId } })
  ),
};
