import {
  ActionTypes,
  RESET_CURRENT,
  RESET_WEEK,
  SET_CURRENT_WEATHER,
  SET_LOADING,
  SET_WEEK_WEATHER,
  ThunkType,
} from './types';
import {
  CurrentWeatherType,
  Weather,
  WeekWeatherType,
} from '../../Services/api';
import { ToastAndroid } from 'react-native';

const setCurrentWeather = (data: CurrentWeatherType): ActionTypes => ({
  type: SET_CURRENT_WEATHER,
  currentWeather: data,
});
const setWeekWeather = (data: WeekWeatherType | null): ActionTypes => ({
  type: SET_WEEK_WEATHER,
  weekWeather: data,
});
const setLoading = (): ActionTypes => ({ type: SET_LOADING });
export const resetCurrent = (): ActionTypes => ({ type: RESET_CURRENT });
export const resetWeek = (): ActionTypes => ({ type: RESET_WEEK });

export const getCurrentWeather = (
  lat: number,
  lon: number,
): ThunkType => async (dispatch) => {
  try {
    dispatch(resetCurrent());
    let data = await Weather.current(lat, lon);
    dispatch(setCurrentWeather(data));
  } catch (e) {
    ToastAndroid.show(e.message, ToastAndroid.SHORT);
  }
};

export const getWeekWeatherCity = (city: string): ThunkType => async (
  dispatch,
) => {
  try {
    dispatch(resetWeek());
    dispatch(setLoading());
    const response = await Weather.weekCity(city);
    if (response.status === 200) {
      dispatch(setWeekWeather(response.data));
    }
    if (response.status === 204) {
      dispatch(setWeekWeather(null));
    }
  } catch (e) {
    ToastAndroid.show(e.message, ToastAndroid.SHORT);
  }
};

export const getWeekWeatherCoordinates = (
  lat: number,
  lon: number,
): ThunkType => async (dispatch) => {
  try {
    dispatch(resetWeek());
    dispatch(setLoading());
    const response = await Weather.weekCoordinate(lat, lon);
    if (response.status === 200) {
      dispatch(setWeekWeather(response.data));
    }
    if (response.status === 204) {
      dispatch(setWeekWeather(null));
    }
  } catch (e) {
    ToastAndroid.show(e.message, ToastAndroid.SHORT);
  }
};
