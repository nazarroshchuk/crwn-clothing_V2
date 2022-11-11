import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

  console.log('addCartItem', cartItems)
  const existedItem = cartItems.find(item => item.id === productToAdd.id)

  if (existedItem) {
    return cartItems.map(item => item.id === existedItem.id ? {...item, count: item.count + 1} : item)
  }
    return [...cartItems, {...productToAdd, count: 1}]

}
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.count, 0 ));
  }, [cartItems])

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}