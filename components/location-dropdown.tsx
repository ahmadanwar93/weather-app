"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";

type LocationDropdownProps = {
  locations: Array<{
    locationId: string;
    locationName: string;
    slug: string;
  }>;
  currentSlug: string;
  currentName: string;
};

export function LocationDropdown({
  locations,
  currentSlug,
  currentName,
}: LocationDropdownProps) {
  // use the useRouter from i18n routing file so that we dont have to manage locale in the url ourselves
  const router = useRouter();

  const handleLocationChange = (slug: string) => {
    // for client side navigation
    router.push(`/${slug}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-cyan-400 font-mono text-sm"
        >
          <span className="text-cyan-400 mr-2">LOCATION:</span>
          {currentName.toUpperCase()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="bg-zinc-900 border-zinc-700 text-zinc-100 font-mono max-h-100 overflow-y-auto"
      >
        {locations.map((location) => (
          <DropdownMenuItem
            key={location.locationId}
            onClick={() => handleLocationChange(location.slug)}
            className={`
              cursor-pointer
              hover:bg-zinc-800 hover:text-cyan-400
              ${
                location.slug === currentSlug ? "text-cyan-400 bg-zinc-800" : ""
              }
            `}
          >
            {location.locationName}{" "}
            <span className="text-zinc-500 ml-2">[{location.locationId}]</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
