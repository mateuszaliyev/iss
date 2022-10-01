import { useRef } from "react";

import { useLoader } from "@react-three/fiber";
import { type Mesh, BackSide, TextureLoader } from "three";

export const Galaxy = () => {
  const meshRef = useRef<Mesh>(null);

  const earthMap = useLoader(TextureLoader, "/assets/images/starmap.jpg");

  return (
    <>
      <mesh ref={meshRef} scale={[6.378, 6.357, 6.378]}>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial map={earthMap} side={BackSide} />
      </mesh>
    </>
  );
};
