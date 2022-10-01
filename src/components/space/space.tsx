import { Canvas } from "@react-three/fiber";

import { Earth } from "@/components/space/earth";

import { Galaxy } from "./galaxy";
import { Iss } from "./iss";

export const Space = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
      }}
    >
      <ambientLight intensity={1.5} />
      <axesHelper args={[100]} />
      {/* <pointLight position={[1, 1, 1]} /> */}
      <Earth />
      <Iss />
      <Galaxy />
    </Canvas>
  );
};
