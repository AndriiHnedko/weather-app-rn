import { ActionTypes, SET_CURRENT_WEATHER, StateType } from './types';

const initialState: StateType = {
  currentWeather: undefined,
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
    default:
      return state;
  }
};
