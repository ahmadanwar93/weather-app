import { getTranslations } from "next-intl/server";
import { ForecastRecord } from "@/lib/types";

type ForecastGridProps = {
  forecasts: ForecastRecord[]; // Days 2-7 (6 days)
};

export async function ForecastGrid({ forecasts }: ForecastGridProps) {
  const tw = await getTranslations("weather");
  const tc = await getTranslations("weather.conditions");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
      {forecasts.map((forecast) => {
        const date = new Date(forecast.date);
        const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });
        const dateStr = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        });

        return (
          <div
            key={forecast.date}
            className="border border-zinc-700 p-4 hover:border-zinc-600 transition-colors"
          >
            <div className="text-zinc-500 text-xs mb-3">
              {dayName.toUpperCase()} / {dateStr.toUpperCase()}
            </div>

            <div className="text-2xl font-light mb-3">
              {forecast.min_temp}°C <span className="text-zinc-600">→</span>{" "}
              {forecast.max_temp}°C
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-zinc-500 text-xs">
                  {tw("summary").toUpperCase()}:
                </span>
                <div className="text-cyan-400 mt-1">
                  {tc(forecast.summary_forecast)}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-1 text-xs">
                <div className="flex  gap-3">
                  <span className="text-zinc-500">
                    {tw("morning").toUpperCase()}
                  </span>
                  <span className="text-zinc-400">
                    {tc(forecast.morning_forecast)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-zinc-500">
                    {tw("afternoon").toUpperCase()}
                  </span>
                  <span className="text-zinc-400">
                    {tc(forecast.afternoon_forecast)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-zinc-500">
                    {tw("night").toUpperCase()}
                  </span>
                  <span className="text-zinc-400">
                    {tc(forecast.night_forecast)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
