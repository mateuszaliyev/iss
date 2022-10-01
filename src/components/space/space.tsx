import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";

import { Earth } from "@/components/space/earth";

import { useFocus } from "@/hooks/focus";
import { useIss } from "@/hooks/iss";

import { Galaxy } from "./galaxy";
import { Iss } from "./iss";
import { ISSPath } from "./isspath";
import { Sun } from "./sun";

const Test = () => {
  const { position, previousPosition } = useIss();
  const { camera } = useThree();

  useFrame(() => {
    const deltaTarget = [
      position.x - previousPosition.x,
      position.y - previousPosition.y,
      position.z - previousPosition.z,
    ] as [number, number, number];

    camera.position.x += deltaTarget[0];
    camera.position.y += deltaTarget[1];
    camera.position.z += deltaTarget[2];
  });

  return null;
};

export const Space = () => {
  const { focus } = useFocus();

  const { position } = useIss();

  return (
    <Canvas
      camera={{
        far: 10000,
        near: 0.0001,
        position: [0, 0, 10],
        // fov: focus === "earth" ? 75 : 10,
        // fov: focus === "earth" ? 75 : 50,
        // zoom: focus === "earth" ? 1 : 1000,
      }}
    >
      <Test />
      {/* <CameraController /> */}
      <OrbitControls
        maxDistance={focus === "earth" ? 30 : 0.1}
        minDistance={focus === "earth" ? 8.5 : 0.01}
        target={
          focus === "earth" ? [0, 0, 0] : [position.x, position.y, position.z]
        }
      />
      <ambientLight intensity={1.0} />
      <axesHelper args={[100]} />
      {/* <pointLight intensity={1} position={[10, 0, 0]} /> */}
      <Earth />
      <ISSPath />
      <Iss />
      <Galaxy />
      <Sun />
    </Canvas>
  );
};
