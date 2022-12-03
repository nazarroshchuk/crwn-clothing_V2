import { createAction } from "../../utils/reducer/reducer.utils";
import { categoriesActionTypes } from "./category.types";

export const setCategories = (categoriesArray) => createAction(categoriesActionTypes.SET_CATEGORIES, categoriesArray)