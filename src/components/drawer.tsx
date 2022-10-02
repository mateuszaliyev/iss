import { type ReactNode, useEffect, useRef } from "react";

import autoAnimate from "@formkit/auto-animate";

export type DrawerProps = {
  children?: ReactNode;
  open?: boolean;
};

export const Drawer = ({ children, open }: DrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current && autoAnimate(ref.current);
  }, []);

  return (
    <div className="fixed top-10 bottom-0 right-0 z-20 w-96" ref={ref}>
      {open && (
        <div className="flex h-full flex-col bg-black/50 py-6 backdrop-blur-xl">
          {children}
        </div>
      )}
    </div>
  );
};
