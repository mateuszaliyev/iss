import { TRPCError } from "@trpc/server";

import { env } from "@/environment/server.mjs";

import { procedure, router } from "@/server/trpc";

export const tle = router({
  iss: procedure.query(async () => {
    const response = await fetch(env.ISS_TLE_URL);

    if (!response.ok) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Service unavailable.",
      });
    }

    const tle = await response.text();

    return tle.replace(/\r\n/g, "\n").trim();
  }),
});
