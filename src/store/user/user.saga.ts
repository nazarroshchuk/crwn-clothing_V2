import { all, call, takeLatest, put } from "typed-redux-saga/macro";
import { USER_ACTIONS_TYPE } from "./user.types";
import {
  AdditionalInfo,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
  EmailSighInStart,
  SignUpSuccess,
  SignUpUStart,
  userActions,
} from "./user.actions";
import { User } from "firebase/auth";

function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInfo
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield put(
        userActions.signInSuccess({
          id: userSnapshot.id,
          ...userSnapshot.data(),
        })
      );
    }
  } catch (e) {
    yield put(userActions.signInFailed(e as Error));
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (!userAuth) return;

    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (e) {
    yield* put(userActions.signInFailed(e as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (e) {
    yield put(userActions.signInFailed(e as Error));
  }
}

export function* sighInWithEmail(action: EmailSighInStart) {
  const {
    payload: { email, password },
  } = action;
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield* call(getSnapshotFromUserAuth, user);
  } catch (e) {
    yield* put(userActions.signInFailed(e as Error));
  }
}

export function* signUp(action: SignUpUStart) {
  const {
    payload: { email, password, displayName },
  } = action;
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield* put(userActions.signUpSuccess(user, { displayName }));
  } catch (e) {
    yield* put(userActions.signUpFailed(e as Error));
  }
}

export function* signInAfterSingUp(action: SignUpSuccess) {
  const { user, additionalDetails } = action.payload;

  try {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
  } catch (e) {
    yield* put(userActions.signUpFailed(e as Error));
  }
}

export function* sighOut() {
  try {
    yield* call(signOutUser);
    yield* put(userActions.signOutSuccess());
  } catch (e) {
    yield* put(userActions.signOutFailed(e as Error));
  }
}
export function* watchUserAction() {
  yield takeLatest(USER_ACTIONS_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
  yield takeLatest(USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
  yield takeLatest(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, sighInWithEmail);
  yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_START, signUp);
  yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_SUCCESS, signInAfterSingUp);
  yield takeLatest(USER_ACTIONS_TYPE.SIGN_OUT_START, sighOut);
}
export function* userSagas() {
  yield all([call(watchUserAction)]);
}
