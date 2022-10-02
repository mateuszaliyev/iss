import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html className="flex min-h-screen flex-col scroll-smooth [color-scheme:dark]">
    <Head />
    <body className="flex flex-1 flex-col bg-black font-titillium-web text-white">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
