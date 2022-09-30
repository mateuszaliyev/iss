// @ts-check

/* eslint-disable-next-line unused-imports/no-unused-imports */
import { env } from "./src/environment/server.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
    newNextLinkBehavior: true,
  },
  headers: async () => [
    {
      /** @see https://nextjs.org/docs/advanced-features/security-headers */
      headers: [
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP */
        {
          key: "Content-Security-Policy",
          value: `
          child-src 'none';
          default-src 'self';
          frame-ancestors 'none';
          img-src 'self' data:;
          media-src 'none';
          script-src 'self' 'unsafe-eval' 'unsafe-inline';
          style-src 'self' 'unsafe-inline';
        `
            .replace(/\s{2,}/g, " ")
            .trim(),
        },
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy */
        {
          key: "Permissions-Policy",
          value: "camera=(), geolocation=(), microphone=()",
        },
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security */
        {
          key: "Strict-Transport-Security",
          value: "includeSubDomains; max-age=31536000; preload",
        },
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options */
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control */
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options */
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
      ],
      source: "/(.*)",
    },
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
