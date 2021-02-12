import { ThunkAction } from 'redux-thunk';
import { CurrentWeatherType, WeekWeatherType } from '../../Services/api';

export const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';
export const SET_WEEK_WEATHER = 'SET_WEEK_WEATHER';
export const SET_LOADING = 'SET_LOADING';
export const RESET_CURRENT = 'RESET_CURRENT';
export const RESET_WEEK = 'RESET_WEEK';

type SetCurrentWeatherActionType = {
  type: typeof SET_CURRENT_WEATHER;
  currentWeather: CurrentWeatherType;
};

type SetWeekWeatherActionType = {
  type: typeof SET_WEEK_WEATHER;
  weekWeather: WeekWeatherType | null;
};

type SetLoadingActionType = {
  type: typeof SET_LOADING;
};

type ResetCurrentActionType = {
  type: typeof RESET_CURRENT;
};

type ResetWeekActionType = {
  type: typeof RESET_WEEK;
};

export type StateType = {
  currentWeather?: CurrentWeatherType;
  weekWeather?: WeekWeatherType | null;
  loading: boolean;
};

export type ActionTypes =
  | SetCurrentWeatherActionType
  | SetWeekWeatherActionType
  | SetLoadingActionType
  | ResetCurrentActionType
  | ResetWeekActionType;

export type ThunkType = ThunkAction<Promise<void>, StateType, {}, ActionTypes>;
