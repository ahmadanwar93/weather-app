import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
// to remove the error
import "../globals.css";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export const metadata: Metadata = {
  title: "Malaysia Weather Forecast",
  description:
    "7-day weather forecast for Malaysia powered by MET Malaysia data",
  keywords: ["weather", "malaysia", "forecast", "MET Malaysia"],
};

// this becomes the root layout

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  // here the locale is coming from route params (file based)

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "ms")) {
    notFound();
  }

  // Load messages for this locale
  // internally called the cached results from getRequestConfig that gets resolved earlier
  const messages = await getMessages();

  // NextIntlClientProvider serializes messages into the client payload for client components to use useTranslations
  return (
    // the lang props to declare language of page for accessibility
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
