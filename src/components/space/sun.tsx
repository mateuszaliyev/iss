import { useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import suncalc from "suncalc";
import { type Mesh, BackSide, TextureLoader } from "three";

export const Sun = () => {
  let initialized = false;

  useFrame((/* { clock } */) => {
    if (!sunRef.current) {
      return;
    }
    if (!pivotRef.current) {
      return;
    }

    if (!initialized) {
      pivotRef.current.add(sunRef.current);
      initialized = true;
    }

    // pivotRef.current.rotation.y = clock.elapsedTime / 10;

    const sunPos = suncalc.getPosition(new Date(), 0, 0);

    const earthRadius = 1600;

    const sunX = earthRadius * Math.sin(sunPos.azimuth);

    const sunY = earthRadius * Math.sin(sunPos.altitude);

    const sunZ = earthRadius * Math.cos(sunPos.azimuth);

    // const sunrisePos = sunCoords();

    // console.log(sunPos);
    // console.log([sunX, sunY, sunZ]);

    sunRef.current.position.x = sunX;
    sunRef.current.position.y = sunY;
    sunRef.current.position.z = sunZ;

    // sunRef.current.rotation.x = clock.elapsedTime;
    // sunRef.current.rotateOnWorldAxis(new Vector3(1, 0, 0), clock.elapsedTime);
  });

  const sunRef = useRef<Mesh>(null);
  const pivotRef = useRef<Mesh>(null);

  const earthMap = useLoader(TextureLoader, "/assets/images/2k_sun.jpg");

  return (
    <>
      <mesh ref={pivotRef}></mesh>
      <mesh ref={sunRef} scale={[6.378, 6.357, 6.378]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial map={earthMap} side={BackSide} />
        <pointLight intensity={1.5} />
      </mesh>
    </>
  );
};
