import { useEffect, useRef, useState } from "react";
import { MdRestartAlt } from "react-icons/md";

import autoAnimate from "@formkit/auto-animate";
import {
  type DateValue,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";

import { Button } from "@/components/button";
import { DateField } from "@/components/date/field";
import { Drawer } from "@/components/drawer";

import { useTime } from "@/hooks/time";

export type DateDrawerProps = {
  open?: boolean;
};

const getDateValueFromTimestamp = (timestamp: number) =>
  parseAbsoluteToLocal(new Date(timestamp).toISOString()) as DateValue;

export const DateDrawer = ({ open }: DateDrawerProps) => {
  const { getTime, setOffset, setOffsetFromDate } = useTime(
    ({ getTime, setOffset, setOffsetFromDate }) => ({
      getTime,
      setOffset,
      setOffsetFromDate,
    })
  );

  const emptyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (emptyRef.current) {
      autoAnimate(emptyRef.current);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setDate(getDateValueFromTimestamp(getTime()));
    }
  }, [getTime, open]);

  const [date, setDate] = useState(getDateValueFromTimestamp(getTime()));

  return (
    <Drawer open={open}>
      <h2 className="pb-6 text-center text-2xl">Set a date</h2>
      <form
        className="flex flex-col items-center gap-8"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <DateField
          aria-label="Date"
          granularity="minute"
          onChange={(value) => {
            setDate(value);
            setOffsetFromDate(value.toDate(getLocalTimeZone()));
          }}
          value={date}
        />
        <Button
          icon={<MdRestartAlt className="h-5 w-5" />}
          onClick={() => {
            setOffset(0);
            setDate(parseAbsoluteToLocal(new Date(Date.now()).toISOString()));
          }}
          type="button"
        >
          Reset
        </Button>
      </form>
    </Drawer>
  );
};
