import { useId } from "react";
import { type AriaMeterProps, useMeter } from "react-aria";

export type MeterProps = AriaMeterProps & {
  fractionDigits?: number;
  size?: number;
  unit?: string;
};

export const Meter = (props: MeterProps) => {
  const {
    fractionDigits = 0,
    label,
    maxValue = 100,
    minValue = 0,
    showValueLabel = Boolean(label),
    size = 300,
    unit,
    value = 0,
  } = props;

  const {
    meterProps: { "aria-labelledby": _ariaLabelledBy, id: _id, ...meterProps },
  } = useMeter(props);

  const labelId = useId();
  const rootId = useId();

  const percentage = (value - minValue) / (maxValue - minValue);

  const center = size / 2;
  const strokeWidth = (7 * size) / 150;
  const radius = center - strokeWidth;
  const circumference = 2 * radius * Math.PI;
  const arc = circumference * (270 / 360);
  const offset = circumference - Math.max(Math.min(percentage, 1), 0) * arc;

  return (
    <svg
      aria-labelledby={labelId}
      className="select-none"
      fill="none"
      height={size}
      id={rootId}
      strokeWidth={strokeWidth}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      {...meterProps}
    >
      <circle
        className="stroke-current"
        cx={center}
        cy={center}
        r={radius}
        role="presentation"
        strokeDasharray={`${arc} ${circumference}`}
        strokeOpacity={0.2}
        transform={`rotate(135 ${center} ${center})`}
      />
      <circle
        className="stroke-current transition-all duration-500"
        cx={center}
        cy={center}
        r={radius}
        role="presentation"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(135 ${center} ${center})`}
      />
      {label && (
        <text
          className="fill-current opacity-50"
          fontSize={0.08 * size}
          id={labelId}
          role="presentation"
          textAnchor="middle"
          x={center}
          y={center - (9 * size) / 50}
        >
          {label}
        </text>
      )}
      {showValueLabel && (
        <text
          className="fill-current"
          fontSize={(4 * size) / 15}
          role="presentation"
          textAnchor="middle"
          x={center}
          y={center + size / 15}
        >
          {Math.round(value * 10 ** fractionDigits) / 10 ** fractionDigits}
        </text>
      )}
      {unit && (
        <text
          className="fill-current opacity-50"
          fontSize={0.08 * size}
          role="presentation"
          textAnchor="middle"
          x={center}
          y={center + size / 5}
        >
          {unit}
        </text>
      )}
    </svg>
  );
};
