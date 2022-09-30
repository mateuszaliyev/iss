import { useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { type Mesh, TextureLoader } from "three";

export const Earth = () => {
  const meshRef = useRef<Mesh>(null);

  const earthMap = useLoader(
    TextureLoader,
    "/assets/images/blue-marble/world.topo.200410.3x5400x2700.png"
  );

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 50, 50]} />
      <meshBasicMaterial color={0xffffff} map={earthMap} />
      {/* <shaderMaterial
        fragmentShader={`
          void main() {
            gl_FragColor = vec4(0.4, 1, 1, 1);
          }
        `}
        vertexShader={`
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
          }
        `}
      /> */}
    </mesh>
  );
};
