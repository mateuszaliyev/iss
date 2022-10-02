import type { ButtonHTMLAttributes, ReactNode } from "react";

import { clsx } from "clsx";

export type ButtonSecondaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

export const ButtonSecondary = ({
  children,
  className,
  icon,
  ...props
}: ButtonSecondaryProps) => (
  <button
    className={clsx(
      "pointer flex items-center gap-2 rounded-md text-base leading-10 transition-colors hover:text-gray-400",
      className
    )}
    {...props}
  >
    {icon}
    {children}
  </button>
);
