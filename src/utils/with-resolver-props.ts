import { PrismaClient } from "@prisma/client";

interface DefaultResolverProps {
  source?: any;
  args?: any;
  context?: any;
}

type ResolverProps<HigherProps extends DefaultResolverProps> = {
  [key in "source" | "args" | "context"]: key extends "context"
    ? { prismaClient: PrismaClient }
    : HigherProps[key];
};

function withResolverProps<HigherProps extends DefaultResolverProps, ResolverResult>(
  resolver: (resolverProps: ResolverProps<HigherProps>) => ResolverResult
) {
  return function (
    source: ResolverProps<HigherProps>["source"],
    args: ResolverProps<HigherProps>["args"],
    context: ResolverProps<HigherProps>["context"]
  ) {
    return resolver({ source, args, context } as ResolverProps<HigherProps>);
  };
}

export default withResolverProps;
