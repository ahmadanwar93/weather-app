import { getTranslations } from "next-intl/server";
import { getLocationBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ForecastGrid } from "@/components/forecast-grid";

type Props = {
  params: Promise<{
    locale: string;
    location: string;
  }>;
};

// ISR does not rebuild on schedule. It will rebuilds on demand when traffic occurs
// if the servers cached page has expired, but no one visits, it wont get rebuild
// ISR is traffic triggered, not time triggered
export const revalidate = 86400;

export default async function WeatherPage({ params }: Props) {
  // destructuring then renaming
  // same as const locationSlug = params.location;
  // we want to be clear that the location is not the actual location object, it is a slug
  const { locale, location: locationSlug } = await params;

  // Fetch weather data for this location
  const locationData = await getLocationBySlug(locationSlug);

  // 404 if location not found
  if (!locationData) {
    notFound();
  }

  // split translation based on namespaces
  const t = await getTranslations("common");
  const tw = await getTranslations("weather");
  const tc = await getTranslations("weather.conditions");
  const ts = await getTranslations("weather.summaryWhen");

  // Get today's forecast (first in sorted array)
  const today = locationData.forecasts[0];

  const upcomingDays = locationData.forecasts.slice(1, 7);

  if (!today) {
    return (
      <main className="min-h-screen p-8">
        <Header currentLocationSlug={locationSlug} locale={locale} />
        <div className="border border-zinc-700 p-6 max-w-4xl">
          <p className="text-zinc-500">No forecast data available</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <Header currentLocationSlug={locationSlug} locale={locale} />
        <div className="border border-zinc-700 p-6 max-w-5xl">
          <div className="text-zinc-500 text-sm mb-4">
            {tw("today").toUpperCase()} /{" "}
            {new Date(today.date)
              // in this case since Malaysia is a commonwealth country, so ms-MY also the same convention DD/MM/YYYY
              .toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })
              .toUpperCase()}
          </div>

          <div className="text-zinc-400 text-xs mb-2">
            {locationData.locationName.toUpperCase()}
          </div>

          <h2 className="text-6xl font-light mb-6">
            {today.min_temp}°C <span className="text-zinc-500">→</span>{" "}
            {today.max_temp}°C
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-zinc-500 w-24 inline-block">
                {tw("summary").toUpperCase()}:
              </span>
              <span className="bg-cyan-900/50 text-cyan-300 px-2 py-0.5">
                {tc(today.summary_forecast).toUpperCase()}
              </span>
              {today.summary_when && (
                <div className="border-t border-zinc-800 pt-4">
                  <span className="text-zinc-500">
                    {tw("summary").toUpperCase()} TIMING:{" "}
                  </span>
                  <span className="text-cyan-400">
                    {ts(today.summary_when)}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-800 pt-4 space-y-2">
              <div className="text-zinc-500 mb-2">
                {tw("timeline").toUpperCase()}:
              </div>

              <div className="flex gap-4">
                <span className="text-zinc-400">
                  [{tw("morning").toUpperCase()}]
                </span>
                <span>{tc(today.morning_forecast)}</span>
              </div>

              <div className="flex gap-4">
                <span className="text-zinc-400">
                  [{tw("afternoon").toUpperCase()}]
                </span>
                <span className="text-cyan-400">
                  {tc(today.afternoon_forecast)}
                </span>
              </div>

              <div className="flex gap-4">
                <span className="text-zinc-400">
                  [{tw("night").toUpperCase()}]
                </span>
                <span>{tc(today.night_forecast)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
            <div>DATA: MET MALAYSIA</div>
            <div className="mt-1">
              {t("updated").toUpperCase()}:{" "}
              {new Date(today.date).toLocaleDateString()}
              <span className="text-green-500 ml-2">
                {t("online").toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <ForecastGrid forecasts={upcomingDays} />
      </div>
    </main>
  );
}
