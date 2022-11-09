import { type ButtonHTMLAttributes, ReactNode } from "react";

import { clsx } from "clsx";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: "danger" | "primary" | "secondary";
};

export const Button = ({
  children,
  className,
  icon,
  variant = "primary",
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      "pointer flex items-center gap-2 rounded-md text-base leading-10 transition-colors",
      variant === "danger" && "bg-red-600 px-4 font-semibold hover:bg-red-700",
      variant === "primary" && "bg-sky-600 px-4 font-semibold hover:bg-sky-700",
      variant === "secondary" && "hover:text-gray-400",
      className
    )}
    {...props}
  >
    {icon}
    {children}
  </button>
);
