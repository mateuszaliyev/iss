import { t } from "@/server/trpc";

import { authenticationRouter } from "./authentication";
import { issRouter } from "./iss";

// export type definition of API
export type Router = typeof router;

export const router = t.router({
  authentication: authenticationRouter,
  iss: issRouter,
});
