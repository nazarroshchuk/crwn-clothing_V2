import { userActionTypes } from "./user.types";


const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
}
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload} = action;
  switch (type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      }
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      }
    case userActionTypes.SIGN_IN_FAILED:
    case userActionTypes.SIGN_UP_FAILED:
    case userActionTypes.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    default:
      return state;
  }

}