import React from "react";
import produce from "immer";

import {Product} from "../product/types";

import {CartItem, Context, State, Actions, Cart} from "./types";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CartContext = React.createContext({} as Context);

const CartProvider = ({children}: Props) => {
  const [cart, setCart] = React.useState<Cart>({});

  const state: State = {cart};
  const actions: Actions = {add, remove};

  function add(product: Product) {
    setCart(
      produce((cart) => {
        if (cart[product.id]) {
          cart[product.id].count++;
        } else {
          cart[product.id] = {
            id: product.id,
            count: 1,
            product,
          };
        }

        return cart;
      }),
    );
  }

  function remove(id: CartItem["id"]) {
    setCart(
      produce((cart) => {
        if (cart[id].count === 1) {
          delete cart[id];
        } else {
          cart[id].count--;
        }

        return cart;
      }),
    );
  }

  return <CartContext.Provider value={{state, actions}}>{children}</CartContext.Provider>;
};

export {CartProvider as Provider, CartContext as default};
