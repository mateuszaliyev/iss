import { useRef } from "react";

import { Text, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";

import { useFocus } from "@/hooks/focus";
import { useIss } from "@/hooks/iss";
import { useTime } from "@/hooks/time";

import { trpc } from "@/trpc";

import { getCoordinatesFromTle } from "@/utilities/get-coordinates-from-tle";

export const Iss = () => {
  const { data: tle } = trpc.tle.iss.useQuery();

  const issRef = useRef<Mesh>(null);
  const textRef = useRef<Mesh>(null);

  const { setPosition } = useIss();
  const { camera } = useThree();
  const { focus } = useFocus();
  const getTime = useTime((state) => state.getTime);

  const iss = useGLTF("/assets/models/turbo_iss.gltf");

  useFrame(() => {
    if (!tle || !issRef.current || !textRef.current) {
      return;
    }

    const { x, y, z } = getCoordinatesFromTle(tle, getTime());

    setPosition({ x, y, z });

    issRef.current.position.set(x, y, z);
    textRef.current.position.set(x, y - 0.1, z);
    textRef.current.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z
    );
  });

  return (
    <>
      <primitive
        object={iss.scene}
        ref={issRef}
        scale={[0.001, 0.001, 0.001]}
      />
      <mesh ref={textRef} visible={focus === "earth"}>
        <Text color={0xffffff} outlineColor={0x0} outlineWidth={0.01}>
          ISS
        </Text>
      </mesh>
    </>
  );
};
