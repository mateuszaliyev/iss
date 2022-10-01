import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { getLatLngObj } from "tle.js";

import { trpc } from "@/utilities/trpc";

export const ISSPath = () => {
  const { data: tle } = trpc.iss.tle.useQuery();

  const pathRef = useRef<Mesh>(null);

  useFrame(() => {
    console.log(tle);
    if (!tle || !pathRef.current) {
      return;
    }

    const { lat: latitude, lng: longitude } = getLatLngObj(tle, Date.now());

    const distanceFromEarthCenter = 6378 + 400;

    const x =
      (distanceFromEarthCenter * Math.sin((longitude * Math.PI) / 180)) / 1000;
    const y =
      (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) / 1000;
    const z =
      (distanceFromEarthCenter * Math.cos((longitude * Math.PI) / 180)) / 1000;

    pathRef.current.position.set(x, y, z);
  });

  return (
    <>
      <mesh ref={pathRef}>
        <sphereGeometry args={[0.1, 50, 50]} />
        <meshStandardMaterial color={0xffff00} />
      </mesh>
    </>
  );
};
