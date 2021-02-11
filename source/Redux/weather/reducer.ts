import {
  ActionTypes,
  RESET_CURRENT,
  RESET_WEEK,
  SET_CURRENT_WEATHER,
  SET_LOADING,
  SET_WEEK_WEATHER,
  StateType,
} from './types';

const initialState: StateType = {
  currentWeather: undefined,
  weekWeather: undefined,
  loading: false,
};

export const weather = (
  state = initialState,
  action: ActionTypes,
): StateType => {
  switch (action.type) {
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.currentWeather,
      };
    case SET_WEEK_WEATHER:
      return {
        ...state,
        weekWeather: action.weekWeather,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RESET_CURRENT:
      return {
        ...state,
        currentWeather: undefined,
      };
    case RESET_WEEK:
      return {
        ...state,
        weekWeather: undefined,
      };
    default:
      return state;
  }
};
