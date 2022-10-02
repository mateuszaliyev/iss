import type { ButtonHTMLAttributes, ReactNode } from "react";

import { clsx } from "clsx";

export type ButtonDangerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

export const ButtonDanger = ({
  children,
  className,
  icon,
  ...props
}: ButtonDangerProps) => (
  <button
    className={clsx(
      "pointer flex items-center gap-2 rounded-md bg-red-600 px-4 text-base font-semibold leading-10 transition-colors hover:bg-red-700",
      className
    )}
    {...props}
  >
    {icon}
    {children}
  </button>
);
