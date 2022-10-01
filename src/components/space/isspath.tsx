import { getLatLngObj } from "tle.js";

import { trpc } from "@/utilities/trpc";

import { PathComponent } from "./pathcomponent";

interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export const ISSPath = () => {
  const times = Array.from({ length: 300 }, (_, i) => 3 * i);

  const { data: tle } = trpc.iss.tle.useQuery();

  const points: Coordinates[] = tle
    ? times.map((time) => {
        const { lat: latitude, lng: longitude } = getLatLngObj(
          tle,
          Date.now() + time * 10000
        );
        const distanceFromEarthCenter = 6378 + 400;

        // const x =
        //   (distanceFromEarthCenter * Math.sin((longitude * Math.PI) / 180)) /
        //   1000;

        // const y =
        //   (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) /
        //   1000;

        // const z =
        //   (distanceFromEarthCenter * Math.cos((longitude * Math.PI) / 180)) /
        //   1000;

        const x =
          (distanceFromEarthCenter *
            Math.cos((latitude * Math.PI) / 180) *
            Math.cos((longitude * Math.PI) / 180)) /
          1000;

        const y =
          -(
            distanceFromEarthCenter *
            Math.cos((latitude * Math.PI) / 180) *
            Math.sin((longitude * Math.PI) / 180)
          ) / 1000;

        const z =
          (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) /
          1000;

        const coords: Coordinates = { x, y, z };

        return coords;
      })
    : [];

  return (
    <>
      {points.map((point) => (
        <PathComponent
          coordinates={point}
          key={`${point.x},${point.y},${point.z}`}
        />
      ))}
    </>
  );
};
