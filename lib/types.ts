// example of a forecast from API
//  {
//         // double underscore is used
//         "location": {
//             "location_id": "Ds001", // location__location_id
//             "location_name": "Langkawi" // location__location_name
//         },
//         "date": "1957-08-31",
//         "morning_forecast": "Hujan di satu dua tempat",
//         "afternoon_forecast": "Ribut petir di satu dua tempat",
//         "night_forecast": "Tiada hujan",
//         "summary_forecast": "Ribut petir di satu dua tempat",
//         "summary_when": "Petang",
//         "min_temp": 26,
//         "max_temp": 32
//     },

export interface ForecastRecord {
  location: {
    location_id: string;
    location_name: string;
  };
  date: string;
  morning_forecast: string;
  afternoon_forecast: string;
  night_forecast: string;
  summary_forecast: string;
  summary_when: string;
  min_temp: number;
  max_temp: number;
}

export interface LocationForecast {
  locationId: string;
  locationName: string;
  forecasts: ForecastRecord[];
}

export type APIResponse = ForecastRecord[];

export interface WeatherDataWithMeta {
  data: APIResponse;
  fetchedAt: string; // ISO timestamp
}
