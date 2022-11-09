import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import type { Router } from "@/server/router";

/**
 * Input Inference helper.
 * @example type HelloInput = RouterInput["example"]["hello"]
 * @see {@link https://trpc.io/docs/v10/infer-types Inferring Types}
 **/
export type RouterInput = inferRouterInputs<Router>;

/**
 * Output inference helper.
 * @example type HelloOutput = RouterOutput["example"]["hello"]
 * @see {@link https://trpc.io/docs/v10/infer-types Inferring Types}
 **/
export type RouterOutput = inferRouterOutputs<Router>;

const getBaseUrl = () => {
  /**
   * Browser should use relative URL.
   */
  if (typeof window !== "undefined") {
    return "";
  }

  /**
   * Vercel should use `VERCEL_URL`.
   */
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  /**
   * Development environment should use `localhost`.
   */
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCNext<Router>({
  config: () => ({
    links: [
      loggerLink({
        enabled: (options) =>
          process.env.NODE_ENV === "development" ||
          (options.direction === "down" && options.result instanceof Error),
      }),
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: Infinity,
        },
      },
    },
    transformer: superjson,
  }),
  ssr: false,
});
