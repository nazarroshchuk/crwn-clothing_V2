import { createAction } from "../../utils/reducer/reducer.utils";
import { categoriesTypes } from "./category.types";

export const setCategories = (categoriesArray) => createAction(categoriesTypes.SET_CATEGORIES, categoriesArray)