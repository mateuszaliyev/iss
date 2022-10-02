import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "@/environment/server.mjs";

import { t } from "@/server/trpc";

export type City = {
  country: string;
  lat: number;
  localNames: Record<string, string>;
  lon: number;
  name: string;
  state: string;
};

export type OpenWeatherApiCity = {
  country: string;
  lat: number;
  local_names: Record<string, string>;
  lon: number;
  name: string;
  state: string;
};

export const cityRouter = t.router({
  get: t.router({
    byLocation: t.procedure
      .input(
        z.object({
          latitude: z.number(),
          longitude: z.number(),
        })
      )
      .query(
        async ({ input: { latitude, longitude } }): Promise<City | null> => {
          const response = await fetch(
            `${env.OPEN_WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${env.OPEN_WEATHER_API_KEY}`
          );

          if (!response.ok) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Service unavailable.",
            });
          }

          const [city] = (await response.json()) as OpenWeatherApiCity[];

          if (!city) {
            return null;
          }

          return {
            ...city,
            localNames: city.local_names,
          };
        }
      ),
  }),
});
