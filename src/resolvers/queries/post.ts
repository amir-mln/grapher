import { userLoader } from "src/loaders/userLoader";
import withResolverProps from "src/utils/with-resolver-props";

import type { Post, User } from "@prisma/client";

export default {
  user: withResolverProps<{ source: Post }, Promise<User | null>>(
    async ({ source: { authorId } }) => await userLoader.load(authorId)
  ),
};
