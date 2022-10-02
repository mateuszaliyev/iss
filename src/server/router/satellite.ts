import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "@/environment/server.mjs";

import { t } from "@/server/trpc";

export type N2YOApi = {
  above: {
    intDesignator: string;
    launchDate: string;
    satalt: number;
    satid: number;
    satlat: number;
    satlng: number;
    satname: string;
  }[];
  info: {
    category: string;
    satcount: number;
    transactionscount: number;
  };
};

export const satelliteRouter = t.router({
  get: t.router({
    byLocation: t.procedure
      .input(
        z.object({
          latitude: z.number().optional(),
          longitude: z.number().optional(),
        })
      )
      .query(async ({ input: { latitude = 50, longitude = 22 } }) => {
        const response = await fetch(
          `${env.N2YO_API_URL}above/${latitude}/${longitude}/0/70/18/&apiKey=${env.N2YO_API_KEY}`
        );

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Service unavailable.",
          });
        }

        const satellites = (await response.json()) as N2YOApi;

        return satellites;
      }),
  }),
});
