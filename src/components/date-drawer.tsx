import { useEffect, useRef } from "react";

import autoAnimate from "@formkit/auto-animate";

import { Drawer } from "@/components/drawer";

export type DateDrawerProps = {
  open?: boolean;
};

export const DateDrawer = ({ open }: DateDrawerProps) => {
  const emptyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emptyRef.current && autoAnimate(emptyRef.current);
  }, []);

  return (
    <Drawer open={open}>
      <h2 className="pb-6 text-center text-2xl">Pick a date</h2>
    </Drawer>
  );
};
