import { useRef, useState } from "react";

import { Text } from "@react-three/drei";
import { Color, useFrame, useThree } from "@react-three/fiber";
import { type Mesh, Vector3 } from "three";
import { getSatelliteName } from "tle.js";

import { useTime } from "@/hooks/time";

import { getCoordinatesFromTle } from "@/utilities/get-coordinates-from-tle";

export type SatelliteProps = {
  color: Color;
  tle: string;
};

export const Satellite = ({ color, tle }: SatelliteProps) => {
  const [initialized, setInitialized] = useState(false);

  const getTime = useTime((state) => state.getTime);

  useFrame(() => {
    if (!planeteRef.current || !textRef.current) {
      return;
    }

    if (!initialized) {
      setInitialized(true);
    }

    const { x, y, z } = getCoordinatesFromTle(tle, getTime());

    planeteRef.current.position.set(x, y, z);
    textRef.current.position.set(x, y - 0.2, z);
    textRef.current.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z
    );
  });

  const planeteRef = useRef<Mesh>(null);
  const textRef = useRef<Mesh>(null);

  const { camera } = useThree();
  const vector = new Vector3();

  camera.getWorldDirection(vector);

  return (
    <>
      <mesh ref={planeteRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={textRef}>
        <Text color={color} outlineColor={0x000000} outlineWidth={0.01}>
          {getSatelliteName(tle)}
        </Text>
      </mesh>
    </>
  );
};
