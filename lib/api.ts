import { APIResponse, ForecastRecord, LocationForecast } from "./types";

const API_URL = "https://api.data.gov.my/weather/forecast";
// Added two translations key myself for 'Ribut petir di kebanyakan tempat' and 'Hujan di kebanyakan tempat'

// cache the function for 24 hours since it will be updated once daily
export async function getWeatherData(): Promise<APIResponse> {
  const response = await fetch(API_URL, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status}`);
  }

  return response.json();
}

// groupBy location to get all the available locations returned from the API
export function groupByLocation(
  data: APIResponse
): Map<string, LocationForecast> {
  // we use map here just for the sake of learning
  // for the Map, the key is the location_id
  //   we want it like this
  //   Map {
  //   "St001" => { locationId: "St001", locationName: "Kuala Lumpur", forecasts: [7 days] }
  // }
  const grouped = new Map<string, LocationForecast>();

  //   for ... of loop can be used for iterables, which array is one of it
  for (const record of data) {
    const id = record.location.location_id;

    if (!grouped.has(id)) {
      grouped.set(id, {
        locationId: id,
        locationName: record.location.location_name,
        forecasts: [],
      });
    }

    grouped.get(id)!.forecasts.push(record);
  }

  // grouped.values() gives all locationForecast objects
  for (const location of grouped.values()) {
    location.forecasts.sort(
      // positive difference => swap
      // negative difference => keep the order
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  return grouped;
}

export async function getForecastForLocation(
  locationId: string
): Promise<LocationForecast | null> {
  const data = await getWeatherData();
  const grouped = groupByLocation(data);
  return grouped.get(locationId) || null;
}

export async function getAllLocationIds(): Promise<string[]> {
  const data = await getWeatherData();
  const uniqueIds = new Set(data.map((r) => r.location.location_id));
  return Array.from(uniqueIds);
}

// Convert location name to URL-friendly slug
export function locationToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// Find location by slug (reverse of locationToSlug)
export async function getLocationBySlug(
  slug: string
): Promise<LocationForecast | null> {
  const data = await getWeatherData();
  const grouped = groupByLocation(data);

  for (const location of grouped.values()) {
    if (locationToSlug(location.locationName) === slug) {
      return location;
    }
  }

  return null;
}

export async function getAllLocationOptions(): Promise<
  Array<{
    locationId: string;
    locationName: string;
    slug: string;
  }>
> {
  const data = await getWeatherData();
  const grouped = groupByLocation(data);
  // we sort it for better UX
  // grouped.values() return an iterator, we have to convert to array first
  // either use Array.from or spread operator
  const choice = Array.from(grouped.values())
    .map((location) => ({
      locationId: location.locationId,
      locationName: location.locationName,
      slug: locationToSlug(location.locationName),
    }))
    .sort((a, b) => a.locationName.localeCompare(b.locationName));

  return choice;
}
