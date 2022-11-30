import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  cartCount: 0,
  totalCount: 0,
});

const cartActions = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCount: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case cartActions.SET_CART_ITEMS:
      return {
       ...state,
       ...payload,
      }
    case cartActions.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      }
    default: throw new Error(`unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({children}) => {
  const  [ state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount,  totalCount } = state;
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemToCart = (productToAdd) => {
    const newCartItems = removeCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (itemToClear) => {
    const newCartItems = cartItems.filter(item => item.id !== itemToClear.id);
    updateCartItemsReducer(newCartItems);
  }
  const updateCartItemsReducer = (newCartItems) => {
      dispatch(createAction(cartActions.SET_CART_ITEMS, {
          cartItems: newCartItems,
          cartCount: newCartItems.reduce((acc, item) => acc + item.count, 0 ),
          totalCount: newCartItems.reduce((acc, item) => acc + item.count * item.price, 0),
      }))
  }

  const setIsCartOpen = () => {
    dispatch(createAction(cartActions.SET_IS_CART_OPEN))
  }

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    totalCount,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}