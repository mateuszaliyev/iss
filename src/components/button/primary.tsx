import type { ButtonHTMLAttributes, ReactNode } from "react";

import { clsx } from "clsx";

export type ButtonPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

export const ButtonPrimary = ({
  children,
  className,
  icon,
  ...props
}: ButtonPrimaryProps) => (
  <button
    className={clsx(
      "pointer flex items-center gap-2 rounded-md bg-sky-600 px-4 text-base font-semibold leading-10 transition-colors hover:bg-sky-700",
      className
    )}
    {...props}
  >
    {icon}
    {children}
  </button>
);
