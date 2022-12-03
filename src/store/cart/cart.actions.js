import { createAction } from "../../utils/reducer/reducer.utils";
import { cartActionsTypes } from "./cart.types";



export const setIsCartOpen = createAction(cartActionsTypes.SET_IS_CART_OPEN)




const addCartItem = (cartItems, productToAdd) => {
  const existedItem = cartItems.find(item => item.id === productToAdd.id)

  if (existedItem) {
    return cartItems.map(item => item.id === existedItem.id ? {...item, count: item.count + 1} : item)
  }
  return [...cartItems, {...productToAdd, count: 1}]

}

const removeCartItem = (cartItems, productToRemove) => {
  const existedItem = cartItems.find(item => item.id === productToRemove.id);

  if(existedItem.count === 1) {
    return cartItems.filter(item => item.id !== existedItem.id);
  }

  return cartItems.map(item => item.id === productToRemove.id ? {...item, count: item.count - 1} : item)
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
   return createAction(cartActionsTypes.SET_CART_ITEMS, newCartItems);
}

export const removeItemToCart = (cartItems, productToAdd) => {
  const newCartItems = removeCartItem(cartItems, productToAdd);
  return createAction(cartActionsTypes.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, itemToClear) => {
  const newCartItems = cartItems.filter(item => item.id !== itemToClear.id);
  return createAction(cartActionsTypes.SET_CART_ITEMS, newCartItems);
}