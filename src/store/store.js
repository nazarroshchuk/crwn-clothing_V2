import {compose, createStore, applyMiddleware} from 'redux';
import { logger } from "redux-logger/src";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'


// const customMiddleWare = (store) => (next) => (action) => {
//   if(!action.type) {
//     return next(action);
//   }
//
//   console.log('type: ', action.type);
//   console.log('payload: ', action.payload)
//   console.log('currentState: ', store.getState());
//
//   next(action);
//
//   console.log('neat state: ', store.getState());
// }

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store)