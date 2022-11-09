import { useRef } from "react";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type Mesh, BackSide } from "three";

export const Sun = () => {
  let initialized = false;

  useFrame(() => {
    if (!sunRef.current) {
      return;
    }
    if (!pivotRef.current) {
      return;
    }

    if (!initialized) {
      pivotRef.current.add(sunRef.current);
      initialized = true;
    }
  });

  const sunRef = useRef<Mesh>(null);
  const pivotRef = useRef<Mesh>(null);

  const sunMap = useTexture("/assets/images/2k_sun.jpg");

  return (
    <>
      <mesh ref={pivotRef}></mesh>
      <mesh position={[1500, 0, 0]} ref={sunRef} scale={[6.378, 6.357, 6.378]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial map={sunMap} side={BackSide} />
        <pointLight intensity={1.5} />
      </mesh>
    </>
  );
};
