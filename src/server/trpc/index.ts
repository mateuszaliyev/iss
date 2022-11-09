import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { Context } from "@/server/trpc/context";

export const { middleware, procedure, router } = initTRPC
  .context<Context>()
  .create({
    errorFormatter: ({ shape }) => shape,
    transformer: superjson,
  });
