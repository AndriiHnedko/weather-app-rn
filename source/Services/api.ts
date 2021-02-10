import axios from 'axios';

const apiKey = 'ec1cc922c3f7433a832f80fce53f3975';

const weatherInstance = axios.create({
  baseURL: 'https://api.weatherbit.io/v2.0/',
});

export const Weather = {
  current(lat: number, lon: number) {
    return weatherInstance
      .get<ResponseType>(
        `current?lat=${lat}&lon=${lon}&key=${apiKey}&include=minutely`,
      )
      .then((r) => r.data.data[0]);
  },
  weekCity(city: string) {
    return weatherInstance
      .get<WeekWeatherType>(`forecast/daily?city=${city}&key=${apiKey}&days=7`)
      .then((r) => r.data);
  },
  weekCoordinate(lat: number, lon: number) {
    return weatherInstance
      .get<WeekWeatherType>(
        `forecast/daily?lat=${lat}&lon=${lon}&days=${7}&key=${apiKey}`,
      )
      .then((r) => r.data);
  },
};

export type CurrentWeatherType = {
  temp: number;
  city_name: string;
  country_code: string;
  weather: { icon: string };
};

export type ResponseType = {
  data: CurrentWeatherType[];
};

export type WeekWeatherType = {
  data: { temp: number; weather: { icon: string }; valid_date: string }[];
  city_name: string;
  country_code: string;
};
