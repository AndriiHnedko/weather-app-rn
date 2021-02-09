import {
  ActionTypes,
  CurrentWeatherType,
  SET_CURRENT_WEATHER,
  ThunkType,
} from './types';
import { LatLng } from 'react-native-maps';
import { Weather } from '../../Services/api';

export const setCurrentWeather = (
  currentWeather?: CurrentWeatherType,
): ActionTypes => ({
  type: SET_CURRENT_WEATHER,
  currentWeather,
});

export const getCurrentWeather = (coordinates: LatLng): ThunkType => async (
  dispatch,
) => {
  try {
    dispatch(setCurrentWeather());
    let data = await Weather.current(
      coordinates.latitude,
      coordinates.longitude,
    );
    dispatch(setCurrentWeather(data));
  } catch (e) {
    console.log(e);
  }
};
