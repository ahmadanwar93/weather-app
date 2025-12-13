"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";

type LanguageToggleProps = {
  currentLocale: string;
  currentLocationSlug: string;
};

export function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  // we pass in new locale as the second param
  const switchLocale = (newLocale: "en" | "ms") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="lg"
        onClick={() => switchLocale("en")}
        className={`
          font-mono text-xs
          ${
            currentLocale === "en"
              ? "bg-cyan-900/50 text-cyan-300 hover:bg-cyan-900/70"
              : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
          }
        `}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => switchLocale("ms")}
        className={`
          font-mono text-xs
          ${
            currentLocale === "ms"
              ? "bg-cyan-900/50 text-cyan-300 hover:bg-cyan-900/70"
              : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
          }
        `}
      >
        MS
      </Button>
    </div>
  );
}
