import type { Session } from "next-auth";

import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { getServerSession } from "@/server/authentication";
import { prisma } from "@/server/database/client";

export type Context = inferAsyncReturnType<typeof createContext>;

export type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = (opts: CreateContextOptions) => ({
  prisma,
  session: opts.session,
});

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async ({
  req: request,
  res: response,
}: CreateNextContextOptions) => {
  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerSession(request, response);

  return createContextInner({
    session,
  });
};
