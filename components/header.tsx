import { getTranslations } from "next-intl/server";
import { getAllLocationOptions } from "@/lib/api";
import { LocationDropdown } from "./location-dropdown";
import { LanguageToggle } from "./language-toggle";

type HeaderProps = {
  currentLocationSlug: string;
  locale: string;
  lastUpdated: string;
};

export async function Header({
  currentLocationSlug,
  locale,
  lastUpdated,
}: HeaderProps) {
  const t = await getTranslations("common");
  const locations = await getAllLocationOptions();

  // in locations, we have slug and locationName
  const currentLocation = locations.find(
    (loc) => loc.slug === currentLocationSlug
  );

  return (
    <header className="border border-zinc-700 p-4 mb-6 max-w-5xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
        <div>
          <h1 className="text-lg tracking-wide">{t("appTitle")}</h1>
          <p className="text-zinc-500 text-sm">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col md:items-end gap-2">
          <div className="text-sm">
            <span className="text-cyan-400">{t("status")}: </span>
            <span className="ml-2 text-green-500">{t("online")}</span>
          </div>
          <div className="text-xs text-zinc-500">
            DATA: <span className="text-zinc-400">MET MALAYSIA</span>
          </div>

          <div className="text-xs text-zinc-500">
            {t("updated").toUpperCase()}:{" "}
            <span className="text-zinc-400">
              {new Date(lastUpdated).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>{" "}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800">
        <LocationDropdown
          locations={locations}
          currentSlug={currentLocationSlug}
          currentName={currentLocation?.locationName ?? ""}
        />
        <LanguageToggle
          currentLocale={locale}
          currentLocationSlug={currentLocationSlug}
        />
      </div>
    </header>
  );
}
