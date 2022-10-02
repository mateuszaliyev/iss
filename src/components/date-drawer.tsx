import { useEffect, useRef } from "react";
import { MdRestartAlt } from "react-icons/md";

import autoAnimate from "@formkit/auto-animate";

import { Drawer } from "@/components/drawer";

import { useTimestamp } from "@/hooks/timestamp";

import { ButtonPrimary } from "./button/primary";
import { Input } from "./input";

export type DateDrawerProps = {
  open?: boolean;
};

export const DateDrawer = ({ open }: DateDrawerProps) => {
  const { resetTimestamp, setTimestamp, timestamp } = useTimestamp();

  const emptyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emptyRef.current && autoAnimate(emptyRef.current);
  }, []);

  console.log(new Date(timestamp).toISOString().substring(0, 16));

  return (
    <Drawer open={open}>
      <h2 className="pb-6 text-center text-2xl">Pick a date</h2>
      <form
        className="flex flex-col items-center gap-8"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          onChange={(event) => {
            setTimestamp(new Date(event.currentTarget.value).getTime());
          }}
          type="datetime-local"
          value={(() => {
            const offset = new Date().getTimezoneOffset() * 1000 * 60;
            const offsetDate = new Date(timestamp).valueOf() - offset;
            const date = new Date(offsetDate).toISOString();
            return date.substring(0, 16);
          })()}
        />
        <ButtonPrimary
          icon={<MdRestartAlt className="h-5 w-5" />}
          onClick={() => {
            resetTimestamp();
          }}
          type="button"
        >
          Reset
        </ButtonPrimary>
      </form>
    </Drawer>
  );
};
