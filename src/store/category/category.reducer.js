import { categoriesTypes } from "./category.types";

const CATEGORIES_INITIAL_STATE = {
  categoriesMap: {},
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  const { type, payload} = action;

  switch (type) {
    case categoriesTypes.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload
      }
    default:
        return state;
  }
}