import { Post, Profile } from "@prisma/client";
import withResolverProps from "src/utils/with-resolver-props";

export default {
  me: withResolverProps(async ({ context: { user, prismaClient } }) => {
    if (!user) return null;

    return await prismaClient.user.findUnique({
      where: {
        id: user.userId,
      },
      include: { profile: true },
    });
  }),
  post: withResolverProps<{ args: { postId: string } }, Promise<Post | null>>(
    async ({ context: { prismaClient }, args: { postId } }) =>
      await prismaClient.post.findUnique({ where: { id: +postId } })
  ),
  posts: withResolverProps(
    async ({ context: { prismaClient } }) => await prismaClient.post.findMany({})
  ),
  profile: withResolverProps<{ args: { userId: number } }, Promise<Partial<Profile> | null>>(
    async ({ context: { prismaClient, user }, args: { userId } }) => {
      const isOwner = +userId === user?.userId;
      const profile = await prismaClient.profile.findUnique({
        where: {
          userId: +userId,
        },
        select: { userId: true, bio: true, id: true },
      });

      if (!profile) return null;

      return {
        ...profile,
        isOwner,
      };
    }
  ),
};
