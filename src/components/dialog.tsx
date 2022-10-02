import { type ReactNode } from "react";

import Image from "next/future/image";

import { Dialog as HeadlessUiDialog } from "@headlessui/react";

export type DialogProps = {
  children: ReactNode;
  image: {
    alt: string;
    src: string;
  };
  onClose: () => void;
  open?: boolean;
  title: string;
};

export const Dialog = ({
  children,
  image,
  onClose,
  open,
  title,
}: DialogProps) => {
  return (
    <HeadlessUiDialog className="flex" onClose={onClose} open={open}>
      <HeadlessUiDialog.Panel>
        <HeadlessUiDialog.Title>{title}</HeadlessUiDialog.Title>
        <div className="w-full max-w-3xl">
          <Image alt={image.alt} fill src={image.src} />
        </div>
        {children}
      </HeadlessUiDialog.Panel>
    </HeadlessUiDialog>
  );
};
