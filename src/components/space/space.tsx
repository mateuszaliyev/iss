import { Fragment, Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import { Earth } from "@/components/space/earth";

import { useFocus } from "@/hooks/focus";
import { useSatellites } from "@/hooks/satellites";
import { useTime } from "@/hooks/time";

import { trpc } from "@/trpc";

import { Galaxy } from "./galaxy";
import { Iss } from "./iss";
import { OrbitControls } from "./orbit-controls";
import { Satellite } from "./satellite";
import { Sun } from "./sun";
import { Time } from "./time";
import { Trajectory } from "./trajectory";

export const Space = () => {
  const { focus } = useFocus();

  const satellites = useSatellites((state) => state.satellites);

  const { getTime } = useTime(({ getTime, timestamp }) => ({
    getTime,
    timestamp,
  }));

  const { data: issTle } = trpc.tle.iss.useQuery();

  return (
    <>
      <Canvas
        camera={{
          far: 10000,
          near: 0.0001,
          position: [0, 0, 10],
        }}
      >
        <Time />
        <OrbitControls />
        <ambientLight intensity={1.0} />
        <Earth />
        {issTle && (
          <Trajectory
            beginningDate={getTime() - 4000000}
            color={0xffffff}
            endDate={getTime() + 4000000}
            key="ISS"
            tle={issTle}
            visible={focus === "earth"}
          />
        )}
        <Suspense fallback={null}>
          <Iss />
        </Suspense>
        <Galaxy />
        <Sun />
        {satellites.map((satellite) => (
          <Fragment key={satellite.id}>
            <Satellite color={satellite.color} tle={satellite.tle} />
            <Trajectory
              beginningDate={getTime() - 4000000}
              color={satellite.color}
              endDate={getTime() + 4000000}
              tle={satellite.tle}
              visible={focus === "earth"}
            />
          </Fragment>
        ))}
      </Canvas>
    </>
  );
};
