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

export default {
  postCreate: withResolverProps<PostCreateProps, Promise<PostPayload>>(
    async ({ args: { newPost }, context: { prismaClient } }) => {
      if (!newPost.title.trim() || !newPost.content.trim())
        return {
          userErrors: [
            {
              name: "400",
              message: "You must provide title and content to create a post",
            },
          ],
          post: null,
        };

      return {
        userErrors: [],
        post: await prismaClient.post.create({
          data: { ...newPost, authorId: 1 },
        }),
      };
    }
  ),
};
