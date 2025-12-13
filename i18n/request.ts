import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// this is a factory function that returns a config object that will get consumed by next-intl internal
// this will runs after middleware. Middleware doesnt need message files yet
// this file is used during rendering (to know whuch messages to load)
// runs per request on the server to load the correct message
export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is not the locale params from url segment
  // it is the value of x-next-intl-locale from headers set by middleware
  // so if middleware is put wrong, then the locale resolved to undefined
  let locale = await requestLocale;
  // why use requestLocale here? For abstraction

  // Validate locale exists in our routing config
  if (!locale || !routing.locales.includes(locale as "en" | "ms")) {
    locale = routing.defaultLocale;
  }
  // the message load will be cached for the duration of the request
  // during the request cycle, when the children conponent uses getTranslations, it is not reloading message again. Just use cache
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
