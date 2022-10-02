import { HTMLAttributes } from "react";

import { clsx } from "clsx";

export type NavbarProps = HTMLAttributes<HTMLElement>;

export const Navbar = ({ className, ...props }: NavbarProps) => (
  <nav
    className={clsx(
      "fixed top-0 left-0 right-0 z-10 flex gap-8 bg-black/50 px-4 backdrop-blur-xl",
      className
    )}
    {...props}
  />
);
