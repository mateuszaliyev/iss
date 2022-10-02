import { t } from "@/server/trpc";

import { authenticationRouter } from "./authentication";
import { cityRouter } from "./city";
import { issRouter } from "./iss";
import { satelliteRouter } from "./satellite";

// export type definition of API
export type Router = typeof router;

export const router = t.router({
  authentication: authenticationRouter,
  city: cityRouter,
  iss: issRouter,
  satellite: satelliteRouter,
});
