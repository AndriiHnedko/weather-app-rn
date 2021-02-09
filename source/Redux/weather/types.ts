import { ThunkAction } from 'redux-thunk';

export const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';

type WeatherType = {
  icon: string;
};
type TemperatureType = {
  temp: number;
};
export type CurrentWeatherType = {
  weather: WeatherType[];
  main: TemperatureType;
};

type SetCurrentWeatherActionType = {
  type: typeof SET_CURRENT_WEATHER;
  currentWeather?: CurrentWeatherType;
};

export type StateType = {
  currentWeather?: CurrentWeatherType;
};

export type ActionTypes = SetCurrentWeatherActionType;

export type ThunkType = ThunkAction<Promise<void>, StateType, {}, ActionTypes>;
