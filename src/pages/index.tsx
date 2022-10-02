import { useState } from "react";
import {
  MdClose,
  MdFormatListBulleted,
  MdHistoryToggleOff,
  MdPublic,
} from "react-icons/md";

import Link from "next/link";

import { clsx } from "clsx";

import { ButtonSecondary } from "@/components/button/secondary";
import { DateDrawer } from "@/components/date-drawer";
import { ManageHistoryIcon } from "@/components/icons/manage-history";
import { SatelliteIcon } from "@/components/icons/satellite";
import { Navbar } from "@/components/navbar";
import { SatellitesDrawer } from "@/components/satellites-drawer";
import { Space } from "@/components/space";

import { useFocus } from "@/hooks/focus";

const Home = () => {
  const { focus, toggleFocus } = useFocus();

  const [dateDrawerOpen, setDateDrawerOpen] = useState(false);
  const [satellitesDrawerOpen, setSatellitesDrawerOpen] = useState(false);

  return (
    <>
      <Navbar>
        <h1 className="flex select-none items-center text-2xl font-semibold">
          500 ISS
        </h1>
        <ButtonSecondary
          icon={
            focus === "earth" ? (
              <SatelliteIcon className="h-5 w-5 fill-current" />
            ) : (
              <MdPublic className="h-5 w-5" />
            )
          }
          onClick={() => toggleFocus()}
        >
          Focus on {focus === "earth" ? "ISS" : "Earth"}
        </ButtonSecondary>
        <Link
          className="pointer flex items-center gap-2 rounded-md text-base leading-10 transition-colors hover:text-gray-400"
          href="/history"
        >
          <MdHistoryToggleOff className="h-5 w-5" />
          History
        </Link>
        {!dateDrawerOpen && !satellitesDrawerOpen && (
          <ButtonSecondary
            className="ml-auto"
            icon={<ManageHistoryIcon className="h-5 w-5 fill-current" />}
            onClick={() => setDateDrawerOpen(true)}
          >
            Pick Date
          </ButtonSecondary>
        )}
        {!dateDrawerOpen && !satellitesDrawerOpen && (
          <ButtonSecondary
            icon={<MdFormatListBulleted className="h-5 w-5" />}
            onClick={() => {
              setSatellitesDrawerOpen(true);
            }}
          >
            Manage Satellites
          </ButtonSecondary>
        )}
        {(dateDrawerOpen || satellitesDrawerOpen) && (
          <ButtonSecondary
            className={clsx(
              (dateDrawerOpen || satellitesDrawerOpen) && "ml-auto"
            )}
            icon={<MdClose className="h-5 w-5" />}
            onClick={() => {
              setDateDrawerOpen(false);
              setSatellitesDrawerOpen(false);
            }}
          >
            Close
          </ButtonSecondary>
        )}
      </Navbar>
      <main className="relative h-screen overflow-y-hidden">
        <Space />
      </main>
      <DateDrawer open={dateDrawerOpen} />
      <SatellitesDrawer open={satellitesDrawerOpen} />
    </>
  );
};

export default Home;
