import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { USER_ACTIONS_TYPE } from "./user.types";
import { AdditionalInfo, UserData } from "../../utils/firebase/firebase.utils";

export type SetCurrentUser = ActionWithPayload<
  USER_ACTIONS_TYPE.SET_CURRENT_USER,
  UserData
>;
export type CheckUserSession = Action<USER_ACTIONS_TYPE.CHECK_USER_SESSION>;
export type GoogleSignStart = Action<USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START>;
export type EmailSighInStart = ActionWithPayload<
  USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;
export type SignInSuccess = ActionWithPayload<
  USER_ACTIONS_TYPE.SIGN_IN_SUCCESS,
  UserData
>;
export type SignInFailed = ActionWithPayload<
  USER_ACTIONS_TYPE.SIGN_IN_FAILED,
  Error
>;
export type SignUpUStart = ActionWithPayload<
  USER_ACTIONS_TYPE.SIGN_UP_START,
  {
    email: string;
    password: string;
    displayName: string;
  }
>;
export type SignUpSuccess = ActionWithPayload<
  USER_ACTIONS_TYPE.SIGN_UP_SUCCESS,
  { user: UserData; additionalDetails: AdditionalInfo }
>;
export type SignUpFailed = ActionWithPayload<
  USER_ACTIONS_TYPE.SIGN_UP_FAILED,
  Error
>;
export type SignOutStart = Action<USER_ACTIONS_TYPE.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTIONS_TYPE.SIGN_OUT_SUCCESS>;
export type SignOutFailed = ActionWithPayload<
  USER_ACTIONS_TYPE.SIGN_OUT_FAILED,
  Error
>;

export const userActions = {
  setCurrentUser: withMatcher(
    (user: UserData): SetCurrentUser =>
      createAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user)
  ),
  checkUserSession: withMatcher(
    (): CheckUserSession => createAction(USER_ACTIONS_TYPE.CHECK_USER_SESSION)
  ),

  googleSignStart: withMatcher(
    (): GoogleSignStart => createAction(USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START)
  ),

  emailSighInStart: withMatcher(
    (email: string, password: string): EmailSighInStart =>
      createAction(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, { email, password })
  ),

  signInSuccess: withMatcher(
    (user: UserData): SignInSuccess =>
      createAction(USER_ACTIONS_TYPE.SIGN_IN_SUCCESS, user)
  ),

  signInFailed: withMatcher(
    (error: Error): SignInFailed =>
      createAction(USER_ACTIONS_TYPE.SIGN_IN_FAILED, error)
  ),

  signUpUStart: withMatcher(
    (email: string, password: string, displayName: string): SignUpUStart =>
      createAction(USER_ACTIONS_TYPE.SIGN_UP_START, {
        email,
        password,
        displayName,
      })
  ),

  signUpSuccess: withMatcher(
    (
      user: UserData,
      additionalDetails: { displayName?: string }
    ): SignUpSuccess =>
      createAction(USER_ACTIONS_TYPE.SIGN_UP_SUCCESS, {
        user,
        additionalDetails,
      })
  ),

  signUpFailed: withMatcher(
    (error: Error): SignUpFailed =>
      createAction(USER_ACTIONS_TYPE.SIGN_UP_FAILED, error)
  ),

  signOutStart: withMatcher(
    (): SignOutStart => createAction(USER_ACTIONS_TYPE.SIGN_OUT_START)
  ),

  signOutSuccess: withMatcher(
    (): SignOutSuccess => createAction(USER_ACTIONS_TYPE.SIGN_OUT_SUCCESS)
  ),

  signOutFailed: withMatcher(
    (error: Error): SignOutFailed =>
      createAction(USER_ACTIONS_TYPE.SIGN_OUT_FAILED, error)
  ),
};
