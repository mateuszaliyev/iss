import { forwardRef, TextareaHTMLAttributes } from "react";

import { clsx } from "clsx";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={clsx(
        "w-full resize-none rounded border-0 bg-white/10 px-4 py-2 text-white/50 focus-within:text-white",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
