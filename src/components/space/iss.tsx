import { Suspense, useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getLatLngObj } from "tle.js";

import { useFocus } from "@/hooks/focus";
import { useIss } from "@/hooks/iss";

import { trpc } from "@/utilities/trpc";

export const Iss = () => {
  const { data: tle } = trpc.iss.tle.useQuery();

  const issRef = useRef<Mesh>(null);

  const { position, setPosition } = useIss();

  const { focus } = useFocus();

  const gltf = useLoader(GLTFLoader, "/assets/models/iss47.gltf");

  useFrame(() => {
    if (!tle || !issRef.current) {
      return;
    }

    const { lat: latitude, lng: longitude } = getLatLngObj(tle, Date.now());

    const distanceFromEarthCenter = 6378 + 400;

    const x =
      (distanceFromEarthCenter * Math.sin((longitude * Math.PI) / 180)) / 1000;
    const y =
      (distanceFromEarthCenter * Math.sin((latitude * Math.PI) / 180)) / 1000;
    const z =
      (distanceFromEarthCenter * Math.cos((longitude * Math.PI) / 180)) / 1000;

    setPosition({ x, y, z });

    issRef.current.position.set(x, y, z);
  });

  return (
    <Suspense fallback={null}>
      <primitive
        object={gltf.scene}
        ref={issRef}
        scale={[0.001, 0.001, 0.001]}
      />
    </Suspense>
  );
};
