import { createAction } from "../../utils/reducer/reducer.utils";
import { categoriesActionTypes } from "./category.types";

export const fetchCategoriesStart = () => createAction(categoriesActionTypes.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categoriesArray) => createAction(categoriesActionTypes.FETCH_CATEGORIES_SUCCESS, categoriesArray);
export const fetchCategoriesFailed = (error) => createAction(categoriesActionTypes.FETCH_CATEGORIES_FAILED, error);

