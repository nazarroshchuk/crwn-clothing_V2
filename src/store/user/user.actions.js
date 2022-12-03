import { createAction } from "../../utils/reducer/reducer.utils";
import { userActionTypes } from "./user.types";


export const setCurrentUser = (user) => createAction(userActionTypes.SET_CURRENT_USER, user)