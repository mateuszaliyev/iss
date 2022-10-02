import type { HTMLAttributes } from "react";

import { clsx } from "clsx";

export type ErrorProps = HTMLAttributes<HTMLSpanElement>;

export const Error = ({ children, className, ...props }: ErrorProps) =>
  children ? (
    <span className={clsx("text-red-500", className)} {...props}>
      {children}
    </span>
  ) : null;
