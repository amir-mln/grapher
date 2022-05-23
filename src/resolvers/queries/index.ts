import { Post, Profile } from "@prisma/client";
import withResolverProps from "src/utils/with-resolver-props";

export default {
  post: withResolverProps<{ args: { postId: number } }, Promise<Post | null>>(
    async ({ context: { prismaClient }, args: { postId } }) =>
      prismaClient.post.findUnique({ where: { id: +postId } })
  ),
  posts: withResolverProps<{ args: { authorId: number } }, Promise<Post[]>>(
    async ({ context: { prismaClient }, args: { authorId } }) =>
      prismaClient.post.findMany({ where: { authorId: +authorId } })
  ),
  profile: withResolverProps<{ args: { userId: number } }, Promise<Profile | null>>(
    async ({ context: { prismaClient }, args: { userId } }) =>
      prismaClient.profile.findUnique({ where: { userId: +userId } })
  ),
};
