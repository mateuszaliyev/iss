import { useFrame } from "@react-three/fiber";

import { useTime } from "@/hooks/time";

export const Time = () => {
  const updateTimestamp = useTime((state) => state.updateTimestamp);

  useFrame(() => {
    updateTimestamp();
  });

  return null;
};
