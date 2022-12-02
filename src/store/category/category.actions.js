import { createAction } from "../../utils/reducer/reducer.utils";
import { categoriesTypes } from "./category.types";

export const setCategoriesMap = (categories) => createAction(categoriesTypes.SET_CATEGORIES_MAP, categories)