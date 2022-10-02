import { useState } from "react";
import { MdClose, MdFormatListBulleted, MdPublic } from "react-icons/md";

import { ButtonSecondary } from "@/components/button/secondary";
import { SatelliteIcon } from "@/components/icons/satellite";
import { Navbar } from "@/components/navbar";
import { SatellitesDrawer } from "@/components/satellites-drawer";
import { Space } from "@/components/space";

import { useFocus } from "@/hooks/focus";

const Home = () => {
  const { focus, toggleFocus } = useFocus();

  const [open, setOpen] = useState(false);

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
        <ButtonSecondary
          className="ml-auto"
          icon={
            open ? (
              <MdClose className="h-5 w-5" />
            ) : (
              <MdFormatListBulleted className="h-5 w-5" />
            )
          }
          onClick={() => setOpen((open) => !open)}
        >
          {open ? "Close" : "Manage Satellites"}
        </ButtonSecondary>
      </Navbar>
      <main className="relative h-screen overflow-y-hidden">
        <Space />
      </main>
      <SatellitesDrawer open={open} />
    </>
  );
};

export default Home;
