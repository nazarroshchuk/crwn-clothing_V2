import {compose, createStore, applyMiddleware} from 'redux';
import { logger } from "redux-logger/src";
import { rootReducer } from "./root-reducer";

const customMiddleWare = (store) => (next) => (action) => {
  if(!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload)
  console.log('currentState: ', store.getState());

  next(action);

  console.log('neat state: ', store.getState());
}

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)