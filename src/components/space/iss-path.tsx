import { useMemo } from "react";

import { getCoordinatesFromTle } from "@/utilities/get-coordinates-from-tle";
import { trpc } from "@/utilities/trpc";

const IssPath = ({
  latitude,
  longitude,
  x,
  y,
  z,
}: {
  latitude: number;
  longitude: number;
  x: number;
  y: number;
  z: number;
}) => {
  const { data, refetch } = trpc.city.get.byLocation.useQuery(
    {
      latitude,
      longitude,
    },
    {
      enabled: false,
    }
  );

  return (
    <mesh
      key={[x, y, z].join("")}
      onClick={() => {
        void refetch();
      }}
      position={[x, y, z]}
    >
      <sphereGeometry args={[0.02, 50, 50]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  );
};

export const IssPaths = () => {
  const { data: tle } = trpc.iss.tle.useQuery();

  const points = useMemo(() => {
    const points: {
      latitude: number;
      longitude: number;
      x: number;
      y: number;
      z: number;
    }[] = [];

    if (!tle) {
      return points;
    }

    for (let i = -300; i <= 300; i += 5) {
      const { latitude, longitude, x, y, z } = getCoordinatesFromTle(
        tle,
        Date.now() + i * 10000
      );

      points.push({ latitude, longitude, x, y, z });
    }

    return points;
  }, [tle]);

  return (
    <group>
      {points.map(({ latitude, longitude, x, y, z }) => (
        <IssPath
          key={[x, y, z].join("")}
          latitude={latitude}
          longitude={longitude}
          x={x}
          y={y}
          z={z}
        />
      ))}
    </group>
  );
};
