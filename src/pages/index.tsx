import { useState } from "react";
import { MdClose, MdFormatListBulleted, MdPublic } from "react-icons/md";

import Head from "next/head";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useProgress } from "@react-three/drei";
import { clsx } from "clsx";

import { Button } from "@/components/button";
import { DateDrawer } from "@/components/date-drawer";
import { ManageHistoryIcon } from "@/components/icons/manage-history";
import { SatelliteIcon } from "@/components/icons/satellite";
import { Meter } from "@/components/meter";
import { Navbar } from "@/components/navbar";
import { SatellitesDrawer } from "@/components/satellites-drawer";
import { Space } from "@/components/space";

import { useFocus } from "@/hooks/focus";

const Home = () => {
  const [mainRef] = useAutoAnimate<HTMLElement>();

  const { focus, toggleFocus } = useFocus();

  const { active, progress } = useProgress();

  const [dateDrawerOpen, setDateDrawerOpen] = useState(false);
  const [satellitesDrawerOpen, setSatellitesDrawerOpen] = useState(false);

  return (
    <>
      <Head>
        <title>ISS</title>
      </Head>
      <Navbar>
        <h1 className="flex select-none items-center text-2xl font-semibold">
          500 ISS
        </h1>
        <Button
          icon={
            focus === "earth" ? (
              <SatelliteIcon className="h-5 w-5 fill-current" />
            ) : (
              <MdPublic className="h-5 w-5" />
            )
          }
          onClick={() => toggleFocus()}
          variant="secondary"
        >
          Focus on {focus === "earth" ? "ISS" : "Earth"}
        </Button>
        {!dateDrawerOpen && !satellitesDrawerOpen && (
          <Button
            className="ml-auto"
            icon={<ManageHistoryIcon className="h-5 w-5 fill-current" />}
            onClick={() => setDateDrawerOpen(true)}
            variant="secondary"
          >
            Set a date
          </Button>
        )}
        {!dateDrawerOpen && !satellitesDrawerOpen && (
          <Button
            icon={<MdFormatListBulleted className="h-5 w-5" />}
            onClick={() => {
              setSatellitesDrawerOpen(true);
            }}
            variant="secondary"
          >
            Manage satellites
          </Button>
        )}
        {(dateDrawerOpen || satellitesDrawerOpen) && (
          <Button
            className={clsx(
              (dateDrawerOpen || satellitesDrawerOpen) && "ml-auto"
            )}
            icon={<MdClose className="h-5 w-5" />}
            onClick={() => {
              setDateDrawerOpen(false);
              setSatellitesDrawerOpen(false);
            }}
            variant="secondary"
          >
            Close
          </Button>
        )}
      </Navbar>
      <main className="relative h-screen overflow-y-hidden" ref={mainRef}>
        <Space />
        {(active || progress === 0) && (
          <div className="absolute inset-0 z-loader flex items-center justify-center bg-black">
            <Meter label="LOADING" unit="%" value={progress} />
          </div>
        )}
      </main>
      <DateDrawer open={dateDrawerOpen} />
      <SatellitesDrawer open={satellitesDrawerOpen} />
    </>
  );
};

export default Home;
