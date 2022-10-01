import { useEffect, useRef } from "react";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { type Mesh, TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export const Earth = () => {
  const meshRef = useRef<Mesh>(null);

  const earthMap = useLoader(
    TextureLoader,
    "/assets/images/blue-marble/world.topo.200410.3x5400x2700.png"
  );

  const bumpMap = useLoader(
    TextureLoader,
    "/assets/images/blue-marble/bumpMap.png"
  );

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    // meshRef.current.rotation.y = -Math.PI / 2;
  });

  return (
    <>
      <CameraController />
      <mesh ref={meshRef} scale={[6.378, 6.357, 6.378]}>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial
          bumpMap={bumpMap}
          bumpScale={0.5}
          color={0xffffff}
          displacementMap={bumpMap}
          displacementScale={0.005}
          map={earthMap}
        />
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
    </>
  );
};
