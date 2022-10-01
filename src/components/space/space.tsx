import { useEffect } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Earth } from "@/components/space/earth";

import { Galaxy } from "./galaxy";
import { Iss } from "./iss";
import { ISSPath } from "./path";
import { Sun } from "./sun";

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

export const Space = () => {
  return (
    <Canvas
      camera={{
        far: 10000,
        position: [0, 0, 10],
      }}
    >
      <CameraController />
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
