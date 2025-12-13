import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// this will run on edge node
// middleware needs to know the config in the routing file, hence the import

export default createMiddleware(routing);
// would get locale from url, cookie or accept-language header

export const config = {
  matcher: ["/", "/(ms|en)/:path*"],
};
