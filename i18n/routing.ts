import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

// static configuration
// source of truth for locale configuration. It is used by both middleware and app code
// it is like a schema definition
// that is why it is imported in both middleware and request file
export const routing = defineRouting({
  locales: ["en", "ms"],
  defaultLocale: "en",
  localePrefix: "always",
});

// this is to create locale aware of Next JS navigation primitives
// for example when redirecting, we dont have to specify locale
// use it for client component
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
