import { TRPCError } from "@trpc/server";

import { env } from "@/environment/server.mjs";

import { t } from "@/server/trpc";

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
    getAll: t.procedure.query(async () => {
      try {
        return await getIssPositionsFromText();
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
    getCurrent: t.procedure.query(async () => {
      try {
        const issPositions = await getIssPositionsFromText();

        let previousPosition: IssPosition | null = null;

        for (const position of issPositions) {
          if (position.epoch.getTime() - Date.now() >= 0) {
            return previousPosition ?? position;
          }

          previousPosition = position;
        }

        throw new Error("Current position could not be found.");
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  }),
});
