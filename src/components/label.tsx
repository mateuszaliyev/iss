import type { LabelHTMLAttributes } from "react";

import clsx from "clsx";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className, ...props }: LabelProps) => (
  <label className={clsx("block pb-2 pt-4", className)} {...props} />
);
