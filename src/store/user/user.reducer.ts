import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { userActions } from "./user.actions";

export type UserState = {
  currentUser: UserData | null;
  isLoading: boolean;
  error: Error | null;
};
const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (userActions.signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }

  if (userActions.signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (
    userActions.signInFailed.match(action) ||
    userActions.signUpFailed.match(action) ||
    userActions.signOutFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }

  return state;
  // switch (type) {
  // case USER_ACTIONS_TYPE.SIGN_IN_SUCCESS:
  //   return {
  //     ...state,
  //     currentUser: payload,
  //     isLoading: false,
  //   }
  // case USER_ACTIONS_TYPE.SIGN_OUT_SUCCESS:
  //   return {
  //     ...state,
  //     currentUser: null,
  //   }
  //   case USER_ACTIONS_TYPE.SIGN_IN_FAILED:
  //   case USER_ACTIONS_TYPE.SIGN_UP_FAILED:
  //   case USER_ACTIONS_TYPE.SIGN_OUT_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //       isLoading: false,
  //     }
  //   default:
  //     return state;
  // }
};
