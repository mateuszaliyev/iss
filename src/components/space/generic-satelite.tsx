import { useRef } from "react";

import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { type Mesh, Vector3 } from "three";

import { getCoordinatesFromTle } from "@/utilities/get-coordinates-from-tle";

export const GenericSatelite = ({
  color,
  position,
  tle,
}: {
  color: number;
  position: Vector3;
  tle: string;
}) => {
  let initialized = false;
  const parsedTle = tle.replace(/\r\n/g, "\n").trim();

  // const sprite = new SpriteText2D("SPRITE", {
  //   align: textAlign.center,
  //   antialias: false,
  //   fillStyle: "#000000",
  //   font: "40px Arial",
  // });

  useFrame((/* { clock } */) => {
    if (!planeteRef.current) {
      return;
    }

    if (!initialized) {
      // planeteRef.current.add(sprite);
      initialized = true;
    }

    const { x, y, z } = getCoordinatesFromTle(tle, Date.now());

    planeteRef.current.position.set(x, y, z);
  });

  const planeteRef = useRef<Mesh>(null);

  const { camera } = useThree();
  const vector = new Vector3();

  camera.getWorldDirection(vector);
  const theta = Math.atan2(vector.x, vector.z);

  return (
    <>
      <mesh position={position} ref={planeteRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh lookAt={camera.position}>
        <Text color="red">Hello world!</Text>
      </mesh>
    </>
  );
};
