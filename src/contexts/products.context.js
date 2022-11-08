import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({});

export const  ProductProvider = ({ children}) => {
    const [products, setProducts] = useState(PRODUCTS)
    return (
        <ProductContext.Provider value={{products}}>
        {children}
        </ProductContext.Provider>
    )
}