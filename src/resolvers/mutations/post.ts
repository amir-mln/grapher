import withResolverProps from "src/utils/with-resolver-props";

import type { Post } from "@prisma/client";

type PostPayload = {
  userErrors: Error[];
  post: Post | null;
};

type NewPost = { title: string; content: string; published: boolean };

type PostCreateProps = {
  args: {
    newPost: NewPost;
  };
};

type PostUpdateProps = {
  args: {
    postId: Number;
    updatedPost: Partial<NewPost>;
  };
};

type PostDeleteProps = {
  args: {
    postId: Number;
  };
};

export default {
  postCreate: withResolverProps<PostCreateProps, Promise<PostPayload>>(
    async ({ args: { newPost }, context: { prismaClient, user } }) => {
      if (!user) return { userErrors: [{ name: "403", message: "Unauthorized" }], post: null };

      return {
        userErrors: [],
        post: await prismaClient.post.create({
          data: { ...newPost, author: { connect: { id: user.userId } } },
        }),
      };
    }
  ),
  postUpdate: withResolverProps<PostUpdateProps, Promise<PostPayload>>(
    async ({ context: { prismaClient, user }, args: { postId, updatedPost } }) => {
      if (!user) return { userErrors: [{ name: "403", message: "Unauthorized" }], post: null };

      const existingPost = await prismaClient.post.findUnique({
        where: {
          id: Number(postId),
        },
      });

      if (!existingPost || existingPost.authorId !== user.userId) {
        return {
          userErrors: [
            {
              name: "404",
              message: "Post does not exist",
            },
          ],
          post: null,
        };
      }

      return {
        userErrors: [],
        post: await prismaClient.post.update({
          data: updatedPost,
          where: {
            id: Number(postId),
          },
        }),
      };
    }
  ),
  postDelete: withResolverProps<PostDeleteProps, Promise<PostPayload>>(
    async ({ context: { prismaClient, user }, args: { postId } }) => {
      if (!user) return { userErrors: [{ name: "403", message: "Unauthorized" }], post: null };

      const post = await prismaClient.post.findUnique({
        where: {
          id: Number(postId),
        },
      });

      if (!post || post.authorId !== user.userId) {
        return {
          userErrors: [
            {
              name: "404",
              message: "Post does not exist",
            },
          ],
          post: null,
        };
      }

      return {
        userErrors: [],
        post: await prismaClient.post.delete({
          where: {
            id: Number(postId),
          },
        }),
      };
    }
  ),
};
