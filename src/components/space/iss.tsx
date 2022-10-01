import { useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

import { trpc } from "@/utilities/trpc";

export const Iss = () => {
  const { data } = trpc.iss.position.get.current.useQuery(undefined, {
    refetchInterval: 1000 * 60,
  });

  const [index, setIndex] = useState(0);

  const issRef = useRef<Mesh>(null);

  // console.log(data?.epoch);

  useFrame(() => {
    if (!issRef.current || !data) {
      return;
    }

    // const element = data[Math.floor(index)];

    // if (element) {
    //   issRef.current.position.x = element.position.x / 1000;
    //   issRef.current.position.y = element.position.y / 1000;
    //   issRef.current.position.z = element.position.z / 1000;

    //   setIndex((index) => {
    //     console.log(element.epoch);

    //     return index + 0.1;
    //   });
    // }

    // issRef.current.position.x = data.position.y / 1000;
    // issRef.current.position.y = data.position.x / 1000;
    // issRef.current.position.z = data.position.z / 1000;

    const lat = 47;
    const lon = -70;

    const earthRadius = 6378.137;

    const x =
      earthRadius *
      Math.cos((lat * Math.PI) / 180) *
      Math.cos((lon * Math.PI) / 180);

    const y =
      earthRadius *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin((lon * Math.PI) / 180);

    const z = earthRadius * Math.sin((lat * Math.PI) / 180);

    console.log("lat lon", x, y, z);
    console.log("iss", data.position.x, data.position.y, data.position.z);

    issRef.current.position.x = x / 1000;
    issRef.current.position.y = y / 1000;
    issRef.current.position.z = z / 1000;
  });

  return (
    <>
      <mesh ref={issRef}>
        <sphereGeometry args={[0.1, 50, 50]} />
        <meshStandardMaterial color={0xff0000} />
      </mesh>
    </>
  );
};
