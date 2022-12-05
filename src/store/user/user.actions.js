import { createAction } from "../../utils/reducer/reducer.utils";
import { userActionTypes } from "./user.types";


export const setCurrentUser = (user) => createAction(userActionTypes.SET_CURRENT_USER, user)

// CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
//   GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
//   EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
//   SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
//   SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE',

export const userActions = {
  checkUserSession: () => createAction(userActionTypes.CHECK_USER_SESSION),

  googleSignStart: () => createAction(userActionTypes.GOOGLE_SIGN_IN_START),

  emailSighInStart: (email, password) => createAction(userActionTypes.EMAIL_SIGN_IN_START, { email, password}),

  sighInSuccess: (user) => createAction(userActionTypes.SIGN_IN_SUCCESS, user),

  signInFailed: (error) => createAction(userActionTypes.SIGN_IN_FAILED, error),

  signUpUStart: (email, password, displayName) => createAction(userActionTypes.SIGN_UP_START, { email, password, displayName}),

  signUpSuccess: ( user, additionalDetails) => createAction(userActionTypes.SIGN_UP_SUCCESS, { user, additionalDetails}),

  signUpFailed: (error) => createAction(userActionTypes.SIGN_UP_FAILED, error),

  signOutStart: () => createAction(userActionTypes.SIGN_OUT_START),

  signOutSuccess: () => createAction(userActionTypes.SIGN_OUT_SUCCESS),

  signOutFailed: (error) => createAction(userActionTypes.SIGN_OUT_FAILED, error)



}
