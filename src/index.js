import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import { ProductProvider } from "./contexts/products.context";
import { CartProvider } from "./contexts/cart.context";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
         <CartProvider>
           <App />
         </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
