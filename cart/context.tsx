import React from "react";
import shortid from "shortid";

import {Product} from "../product/types";

import {CartItem, Context, State, Actions, Cart} from "./types";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CartContext = React.createContext({} as Context);

const CartProvider = ({children}: Props) => {
  const [cart, setCart] = React.useState<Cart>([]);

  const state: State = {cart};
  const actions: Actions = {add, remove};

  function add(product: Product) {
    setCart((cart) => cart.concat({id: shortid.generate(), product}));
  }

  function remove(id: CartItem["id"]) {
    setCart((cart) => cart.filter((item) => item.id !== id));
  }

  return <CartContext.Provider value={{state, actions}}>{children}</CartContext.Provider>;
};

export {CartProvider as Provider, CartContext as default};
