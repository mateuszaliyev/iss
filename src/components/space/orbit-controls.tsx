import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { useFocus } from "@/hooks/focus";
import { useIss } from "@/hooks/iss";

export const OrbitControls = () => {
  const { focus } = useFocus();
  const { position } = useIss();
  const { camera } = useThree();

  return (
    <DreiOrbitControls
      camera={camera}
      makeDefault
      maxDistance={focus === "earth" ? 30 : 0.1}
      minDistance={focus === "earth" ? 7.5 : 0.01}
      target={
        focus === "earth" ? [0, 0, 0] : [position.x, position.y, position.z]
      }
    />
  );
};
