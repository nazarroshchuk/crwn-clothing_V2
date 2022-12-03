import { cartActionsTypes } from "./cart.types";

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCount: 0,
}

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case cartActionsTypes.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      }
    case cartActionsTypes.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      }
    default:
      return state;
  }
}