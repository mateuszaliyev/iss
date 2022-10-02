import type { ReactNode } from "react";
import { useState } from "react";

import Image from "next/image";

import { Dialog } from "./dialog";

export type PartItemProps = {
  children: ReactNode;
  image: {
    alt: string;
    src: string;
  };
  title: string;
};

export const PartItem = ({ image, title, ...props }: PartItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((open) => {
      return !open;
    });
  };
  return (
    <div
      className="w-3/7 text-semibold relative my-4 ml-auto mr-auto 
        flex h-1/2 w-5/12 flex-col items-center justify-center 
        rounded-xl bg-gray-200 p-4 text-center text-3xl text-black shadow-lg"
    >
      <h1>{title}</h1>
      <Image
        alt="smth"
        layout="fill"
        onClick={() => toggleModal()}
        src={image.src}
      />

      <Dialog
        image={image}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        title={title}
      >
        {props.children}
      </Dialog>
    </div>
  );
};
