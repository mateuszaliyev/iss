import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export type Context = inferAsyncReturnType<typeof createContext>;

// export type CreateContextOptions = Record<string, never>;

/**
 * Use this helper for:
 * - testing, to avoid mocking Next.js' request and response,
 * - tRPC's `createSSGHelpers`.
 */
// export const createInnerContext = (options: CreateContextOptions) => {};

/**
 * Context to use in a router.
 *
 * @see {@link https://trpc.io/docs/context tRPC Context Documentation}
 */
export const createContext = (_options: CreateNextContextOptions) => {
  return {}; // createInnerContext();
};
