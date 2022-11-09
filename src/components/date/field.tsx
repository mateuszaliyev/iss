import { useRef } from "react";
import {
  type AriaDateFieldProps,
  useDateField,
  useDateSegment,
  useLocale,
} from "react-aria";
import {
  type DateFieldState,
  type DateSegment,
  useDateFieldState,
} from "react-stately";

import { type DateValue, GregorianCalendar } from "@internationalized/date";
import type { DatePickerProps } from "@react-types/datepicker";
import clsx from "clsx";

export type DateFieldProps<T extends DateValue> = AriaDateFieldProps<T> &
  DatePickerProps<DateValue> & {
    className?: string;
  };

export type DateSegmentProps = {
  segment: DateSegment;
  state: DateFieldState;
};

const createCalendar = (identifier: string) => {
  switch (identifier) {
    case "gregory":
      return new GregorianCalendar();
    default:
      throw new Error(`Unsupported calendar ${identifier}`);
  }
};

const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      className={clsx(
        "group group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-sky-600 focus:text-white",
        segment.isEditable ? "text-white" : "text-white/25"
      )}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth: segment.maxValue
          ? `${String(segment.maxValue).length}ch`
          : undefined,
      }}
      {...segmentProps}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none block w-full text-center italic text-gray-500 group-focus:text-white",
          !segment.isPlaceholder && "invisible h-0"
        )}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
};

export const DateField = <T extends DateValue>(props: DateFieldProps<T>) => {
  const { locale } = useLocale();

  const state = useDateFieldState({
    ...props,
    createCalendar,
    locale,
  });

  const ref = useRef<HTMLDivElement>(null);

  const { fieldProps, labelProps } = useDateField(props, state, ref);

  return (
    <div className={props.className}>
      <span {...labelProps}>{props.label}</span>
      <div
        className="flex rounded bg-white/10 px-4 py-2"
        ref={ref}
        {...fieldProps}
      >
        {state.segments.map((segment, index) => (
          <DateSegment key={index} segment={segment} state={state} />
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </div>
    </div>
  );
};
