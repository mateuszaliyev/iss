import { TRPCError } from "@trpc/server";

import { env } from "@/environment/server.mjs";

import { t } from "@/server/trpc";

export type IssCurrentLocation = {
  message: string;
  position: {
    latitude: number;
    longitude: number;
  };
  timestamp: Date;
};

export type OpenNotifyIssCurrentLocation = {
  iss_position: {
    latitude: string;
    longitude: string;
  };
  message: string;
  timestamp: number;
};

export type IssPosition = {
  /**
   * Time (UTC).
   */
  epoch: Date;
  /**
   * Position (km).
   */
  position: {
    x: number;
    y: number;
    z: number;
  };
  /**
   * Velocity (km/s)
   */
  velocity: {
    x: number;
    y: number;
    z: number;
  };
};

export const getIssPositionsFromText = async (): Promise<IssPosition[]> => {
  const response = await fetch(env.ISS_TRAJECTORY_DATA_URL);

  if (!response.ok) {
    throw new Error("Service unavailable.");
  }

  const text = await response.text();

  const rawData = text.split("COMMENT End sequence of events\r\n")[1];

  if (!rawData) {
    throw new Error("Text could not be parsed.");
  }

  const rows = rawData.split("\r\n");

  const issPositions: IssPosition[] = [];

  for (const row of rows) {
    const cell = row.split(" ");

    const [
      epoch,
      positionX,
      positionY,
      positionZ,
      velocityX,
      velocityY,
      velocityZ,
    ] = cell;

    if (
      !epoch ||
      !positionX ||
      !positionY ||
      !positionZ ||
      !velocityX ||
      !velocityY ||
      !velocityZ
    ) {
      continue;
    }

    issPositions.push({
      epoch: new Date(epoch),
      position: {
        x: parseFloat(positionX),
        y: parseFloat(positionY),
        z: parseFloat(positionZ),
      },
      velocity: {
        x: parseFloat(velocityX),
        y: parseFloat(velocityY),
        z: parseFloat(velocityZ),
      },
    });
  }

  return issPositions;
};

export const issRouter = t.router({
  position: t.router({
    get: t.router({
      all: t.procedure.query(async () => {
        try {
          return await getIssPositionsFromText();
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
      current: t.procedure.query(async () => {
        try {
          const issPositions = await getIssPositionsFromText();

          for (
            let positionIndex = 0;
            positionIndex < issPositions.length;
            positionIndex++
          ) {
            const previousPosition = issPositions[positionIndex - 1];
            const position = issPositions[positionIndex];

            if (!position || !previousPosition) {
              continue;
            }

            if (position.epoch.getTime() - Date.now() >= 0) {
              return previousPosition;
            }
          }

          throw new Error("Current position could not be found.");
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
      now: t.procedure.query(async (): Promise<IssCurrentLocation> => {
        const response = await fetch(env.OPEN_NOTIFY_ISS_CURRENT_LOCATION_URL);

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Service unavailable.",
          });
        }

        const data = (await response.json()) as OpenNotifyIssCurrentLocation;

        return {
          message: data.message,
          position: {
            latitude: parseFloat(data.iss_position.latitude),
            longitude: parseFloat(data.iss_position.longitude),
          },
          timestamp: new Date(data.timestamp),
        };
      }),
      today: t.procedure.query(async () => {
        try {
          const issPositions = await getIssPositionsFromText();

          return issPositions.filter((position) => {
            const now = new Date();

            return (
              position.epoch.getDate() === now.getDate() &&
              position.epoch.getMonth() === now.getMonth() &&
              position.epoch.getFullYear() === now.getFullYear()
            );
          });
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    }),
  }),
  tle: t.procedure.query(async () => {
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
