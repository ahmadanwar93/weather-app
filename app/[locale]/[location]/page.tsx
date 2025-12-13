import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
    location: string;
  }>;
};

export default async function WeatherPage({ params }: Props) {
  const { locale, location } = await params;
  const t = await getTranslations("common");
  const tw = await getTranslations("weather");
  // getTranslations is server-only function that reads from the request-scoped config established by `getRequestConfig`

  return (
    <main className="min-h-screen p-8">
      <header className="border border-zinc-700 p-4 mb-6 max-w-4xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg tracking-wide">{t("appTitle")}</h1>
            <p className="text-zinc-500 text-sm">{t("subtitle")}</p>
          </div>
          <div className="text-sm">
            <span className="text-cyan-400">{t("status")}:</span>
            <span className="ml-2 text-green-500">● {t("online")}</span>
          </div>
        </div>
      </header>

      <div className="border border-zinc-700 p-6 max-w-4xl">
        <div className="text-zinc-500 text-sm mb-4">
          {tw("today")} / {location.toUpperCase()}
        </div>

        <h2 className="text-4xl mb-2">23°C → 32°C</h2>

        <div className="text-cyan-400 text-sm mt-4">
          [{tw("summary")}: Weather data will load here via ISR]
        </div>
      </div>
    </main>
  );
}
