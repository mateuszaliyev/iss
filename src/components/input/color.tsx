import { forwardRef, InputHTMLAttributes } from "react";

import { clsx } from "clsx";

export type InputColorProps = InputHTMLAttributes<HTMLInputElement>;

export const InputColor = forwardRef<HTMLInputElement, InputColorProps>(
  ({ className, ...props }, ref) => (
    <div className="rounded bg-white/10 p-2">
      <input
        className={clsx(
          "block h-8 w-full cursor-pointer bg-transparent transition-opacity hover:opacity-75",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
