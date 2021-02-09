import { applyMiddleware, combineReducers, createStore } from 'redux';
import { weather } from './weather/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  weather,
});

export type StoreType = ReturnType<typeof rootReducer>;

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

// @ts-ignore
window.store = store;
export default store;
//fsd
