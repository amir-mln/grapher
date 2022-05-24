import { Post, Profile, User } from "@prisma/client";
import withResolverProps from "src/utils/with-resolver-props";

export default {
  posts: withResolverProps<{ source: User }, Promise<Post[] | null>>(
    async ({ source: { id: sourceId }, context: { user, prismaClient } }) => {
      const isOwnProfile = sourceId === user?.userId;

      if (isOwnProfile)
        return await prismaClient.post.findMany({
          where: {
            authorId: sourceId,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
        });

      return prismaClient.post.findMany({
        where: {
          authorId: sourceId,
          published: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }
  ),
  profile: withResolverProps<{ source: User }, Promise<Profile | null>>(
    async ({ source: { id: sourceId }, context: { prismaClient } }) => {
      return prismaClient.profile.findUnique({
        where: {
          userId: sourceId,
        },
      });
    }
  ),
};
