import { HTMLAttributes } from "react";

import Image from "next/image";

import { clsx } from "clsx";

export type HistoryItemProps = HTMLAttributes<HTMLElement> & {
  src?: string;
};

export const HistoryItem = ({ className, ...props }: HistoryItemProps) => {
  if (props.src) {
    return (
      <div
        className={clsx(
          "w-3/7 relative my-4 ml-auto mr-auto h-1/2 w-5/12 flex-col rounded-xl bg-gray-200 p-4 text-black shadow-lg",
          className
        )}
      >
        <Image
          alt="dupa"
          className="rounded-xl"
          layout="fill"
          src={props.src}
        ></Image>
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "w-3/7 text-semibold my-4 ml-auto mr-auto flex h-1/2 w-5/12 flex-col items-center justify-center rounded-xl bg-gray-200 p-4 text-center text-3xl text-black shadow-lg",
        className
      )}
    >
      <h1 className="mb-4 mt-2 text-5xl font-semibold">{props.title}</h1>
      <div>{props.children}</div>
    </div>
  );
};
