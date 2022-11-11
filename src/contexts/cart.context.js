import { createContext, useEffect, useState } from "react";

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
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemToCart = (productToAdd) => {
    setCartItems(removeCartItem(cartItems, productToAdd))
  }

  const clearItemFromCart = (itemToClear) => {
    setCartItems(cartItems.filter(item => item.id !== itemToClear.id));
  }

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.count, 0 ));
    setTotalCount(cartItems.reduce((acc, item) => acc + item.count * item.price, 0))
  }, [cartItems])

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartCount,
    totalCount,
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}