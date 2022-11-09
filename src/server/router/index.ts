import { router as createRouter } from "@/server/trpc";

import { tle } from "./tle";

export type Router = typeof router;

export const router = createRouter({
  tle,
});
