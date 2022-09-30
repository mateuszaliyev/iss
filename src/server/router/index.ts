import { t } from "@/server/trpc";

import { authenticationRouter } from "./authentication";

// export type definition of API
export type Router = typeof router;

export const router = t.router({
  authentication: authenticationRouter,
});
