import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider} from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";
import { Provider } from "react-redux";
import { store } from "./store/store";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
      <CategoriesProvider>
       <CartProvider>
         <App />
       </CartProvider>
      </CategoriesProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
