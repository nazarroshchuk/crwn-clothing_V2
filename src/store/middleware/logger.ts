import { Middleware } from "redux";
import { RootState } from "../store";

export const customMiddleWareLogger: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    next(action);

    console.log("neat state: ", store.getState());
  };
