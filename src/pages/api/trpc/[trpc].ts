import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "@/environment/server.mjs";

import { router } from "@/server/router";
import { createContext } from "@/server/trpc/context";

export default createNextApiHandler({
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ error, path }) => {
          console.error(`❌ tRPC failed on ${path ?? ""}:`, error);
        }
      : undefined,
  router,
});
