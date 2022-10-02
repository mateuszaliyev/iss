import { useMemo } from "react";

import { getLatLngObj } from "tle.js";

import { trpc } from "@/utilities/trpc";

export const IssPath = () => {
  const { data: tle } = trpc.iss.tle.useQuery();

  const points = useMemo(() => {
    const points: [x: number, y: number, z: number][] = [];

    if (!tle) {
      return points;
    }

    for (let i = -300; i <= 300; i += 5) {
      const { lat: latitude, lng: longitude } = getLatLngObj(
        tle,
        Date.now() + i * 10000
      );

      const distanceFromEarthCenter = 6378 + 400;

      const x =
        (distanceFromEarthCenter *
          Math.cos((latitude * Math.PI) / 180) *
          Math.cos((longitude * Math.PI) / 180)) /
        1000;

      const y =
        (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) / 1000;

      const z =
        -(
          distanceFromEarthCenter *
          Math.cos((latitude * Math.PI) / 180) *
          Math.sin((longitude * Math.PI) / 180)
        ) / 1000;

      points.push([x, y, z]);
    }

    return points;
  }, [tle]);

  // console.log(points);

  return (
    <group>
      {points.map(([x, y, z]) => (
        <mesh key={[x, y, z].join("")} position={[x, y, z]}>
          <sphereGeometry args={[0.05, 50, 50]} />
          <meshBasicMaterial color={0xff0000} />
        </mesh>
      ))}
    </group>
  );
};
