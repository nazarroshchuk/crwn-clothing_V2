import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../category/category.types";

export type SetIsCartOpen = Action<CART_ACTION_TYPES.SET_IS_CART_OPEN>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;
export const setIsCartOpen = withMatcher(
  (): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemToCart = (
  cartItems: CartItem[],
  productToAdd: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existedItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existedItem) {
    return cartItems.map((item) =>
      item.id === existedItem.id ? { ...item, count: item.count + 1 } : item
    );
  }
  return [...cartItems, { ...productToAdd, count: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  const existedItem = cartItems.find((item) => item.id === productToRemove.id);

  if (existedItem?.count === 1) {
    return cartItems.filter((item) => item.id !== existedItem.id);
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id ? { ...item, count: item.count - 1 } : item
  );
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  itemToClear: CartItem
) => {
  const newCartItems = cartItems.filter((item) => item.id !== itemToClear.id);
  return setCartItems(newCartItems);
};
