import { categoriesActionTypes } from "./category.types";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case categoriesActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case categoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload,
      }
    case categoriesActionTypes.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    default:
        return state;
  }
}