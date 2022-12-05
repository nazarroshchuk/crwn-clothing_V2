import { all, call, takeLatest, put } from 'redux-saga/effects';
import { userActionTypes } from "./user.types";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup, signOutUser
} from "../../utils/firebase/firebase.utils";
import { userActions } from "./user.actions";

function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
    yield put(userActions.sighInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

  } catch (e) {
      yield put(userActions.signInFailed(e));
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)

    if(!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);

  } catch (e) {
    yield put(userActions.signInFailed(e));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (e) {
    yield put(userActions.signInFailed(e));
  }
}

export function* sighInWithEmail(action) {
  const { payload: { email, password }} = action;
   try {
      const { user } = yield call(
        signInAuthUserWithEmailAndPassword,
        email,
        password
      );
     yield call(getSnapshotFromUserAuth, user);
   } catch (e) {
     yield put(userActions.signInFailed(e));
   }
}

export function* signUp(action) {
  const { payload: { email, password, displayName }} = action;
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password,
    );
    yield put(userActions.signUpSuccess(user, { displayName }));
  } catch (e) {
    yield put(userActions.signUpFailed(e));
  }
}

export function* signInAfterSingUp(action) {
  const { user, additionalDetails} = action.payload;

  try {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
  } catch (e) {
    yield put(userActions.signUpFailed(e));
  }
}

export function* sighOut() {
  try {
    yield call(signOutUser);
    yield put(userActions.signOutSuccess());
  } catch (e) {
    yield put(userActions.signOutFailed(e));
  }
}
export function* watchUserAction() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, sighInWithEmail);
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSingUp);
  yield takeLatest(userActionTypes.SIGN_OUT_START, sighOut);
}
export function* userSagas() {
  yield all([
    call(watchUserAction),
    // call(onGoogleSingInStart),
  ]);
}