import { Fragment } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Earth } from "@/components/space/earth";

import { useFocus } from "@/hooks/focus";
import { useIss } from "@/hooks/iss";
import { useSatellites } from "@/hooks/satellites";

import { trpc } from "@/utilities/trpc";

import { Galaxy } from "./galaxy";
import { Iss } from "./iss";
import { Satellite } from "./satellite";
import { SatellitesAboveLocation } from "./satellites-above-location";
import { Sun } from "./sun";
import { Trajectory } from "./trajectory";

// const Test = () => {
//   const { position, previousPosition } = useIss();
//   const { camera } = useThree();

//   useFrame(() => {
//     const deltaTarget = [
//       position.x - previousPosition.x,
//       position.y - previousPosition.y,
//       position.z - previousPosition.z,
//     ] as [number, number, number];

//     // console.log(deltaTarget);

//     // camera.position.x += deltaTarget[0];
//     // camera.position.y += deltaTarget[1];
//     // camera.position.z += deltaTarget[2];
//   });

//   return null;
// };

export const Space = () => {
  const { focus } = useFocus();

  const { position } = useIss();

  const satellites = useSatellites((state) => state.satellites);

  const { data: issTle } = trpc.iss.tle.useQuery();

  const tmpTle = `STARLINK-1015           
  1 44721U 19074J   22274.41408644  .00001284  00000+0  10508-3 0  9998
  2 44721  53.0565  61.7790 0001324  74.6852 285.4283 15.06401698159542`;

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
      <SatellitesAboveLocation />
      {/* <Test /> */}
      <OrbitControls
        maxDistance={focus === "earth" ? 30 : 0.1}
        minDistance={focus === "earth" ? 7.5 : 0.01}
        target={
          focus === "earth" ? [0, 0, 0] : [position.x, position.y, position.z]
        }
      />
      <ambientLight intensity={1.0} />
      {/* <axesHelper args={[100]} /> */}
      {/* <pointLight intensity={1} position={[10, 0, 0]} /> */}
      <Earth />
      {focus === "earth" && issTle && (
        // <IssPaths
        //   beginningDate={new Date().getTime() - 100000}
        //   endDate={new Date().getTime() + 100000}
        // />
        <Trajectory
          beginningDate={new Date().getTime() - 4000000}
          color={0xffffff}
          endDate={new Date().getTime() + 4000000}
          key={"ISS"}
          tle={issTle}
        />
      )}
      <Iss />
      {/* {issTle && (
        <IssPaths
          beginningDate={new Date().getTime() - 10000}
          endDate={new Date().getTime() + 10000}
        />
      )} */}
      <Galaxy />
      <Sun />
      {satellites.map((satellite) => (
        <Fragment key={satellite.id}>
          <Satellite color={satellite.color} tle={satellite.tle} />
          <Trajectory
            beginningDate={new Date().getTime() - 4000000}
            color={satellite.color}
            endDate={new Date().getTime() + 4000000}
            tle={satellite.tle}
          />
        </Fragment>
      ))}
      <SatellitesAboveLocation />
    </Canvas>
  );
};
