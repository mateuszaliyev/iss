import { PathComponent } from "./pathcomponent";

export const ISSPath = () => {
  const times = Array.from({ length: 300 }, (_, i) => 3 * i);
  return (
    <>
      {times.map((d) => (
        <PathComponent key={d} time={d} />
      ))}
    </>
  );
};
