import { takeLatest, all, call, put } from 'redux-saga/effects';
import { categoriesActionTypes } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.actions";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (e) {
    yield put(fetchCategoriesFailed(e));
  }
}
export function* onFetchCategories() {
  yield takeLatest(categoriesActionTypes.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}