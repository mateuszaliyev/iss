import { Canvas } from "@react-three/fiber";

import { Earth } from "@/components/space/earth";

export const Space = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Earth />
    </Canvas>
  );
};
