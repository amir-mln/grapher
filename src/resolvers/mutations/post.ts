import { Post } from "@prisma/client";
import { ResolverProps } from "..";

type PostPayload = {
  userErrors: Error[];
  post: Post | null;
};

type NewPost = {
  title: string;
  content: string;
  published: boolean;
};

export default {
  async postCreate(
    ...[source, { newPost }, { prismaClient }]: ResolverProps<any, { newPost: NewPost }>
  ): Promise<PostPayload> {
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
  },
};
