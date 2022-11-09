import { SSRProvider } from "react-aria";

import type { AppType } from "next/app";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Fonts } from "@/components/fonts";

import { trpc } from "@/trpc";

import "@/styles/globals.css";

const Application: AppType = ({ Component, pageProps }) => (
  <>
    <Fonts />
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </>
);

export default trpc.withTRPC(Application);
