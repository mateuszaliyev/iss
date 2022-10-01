import { useRef } from "react";

import { Mesh } from "three";

import { trpc } from "@/utilities/trpc";

export const ISSPath = () => {
  const { data: tle } = trpc.iss.tle.useQuery();

  const pathRef = useRef<Mesh>(null);

  //   useFrame(() => {
  //     if (!tle || !pathRef.current) {
  //       return;
  //     }

  //     const { lat: latitude, lng: longitude } = getLatLngObj(
  //       tle,
  //       Date.now() + 200
  //     );

  //     const distanceFromEarthCenter = 6378 + 400;

  //     const x = distanceFromEarthCenter * Math.sin((longitude * Math.PI) / 180);

  //     const y = distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180);

  //     const z = distanceFromEarthCenter * Math.cos((longitude * Math.PI) / 180);

  //     pathRef.current.position.y = y / 1000;
  //     pathRef.current.position.z = z / 1000;
  //     pathRef.current.position.x = x / 1000;
  //   });

  return (
    <mesh ref={pathRef}>
      <sphereGeometry args={[5, 50, 50]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  );
};
