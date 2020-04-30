import React from "react";

import CartContext from "./context";
import {getTotal, getProductCount} from "./selectors";

import {Product} from "~/product/types";

export function useCart() {
  const {
    state: {cart},
    actions: {add, remove, checkout},
  } = React.useContext(CartContext);

  return {
    add,
    remove,
    checkout,
    cart,
    count: cart.length,
    total: getTotal(cart),
  };
}

export function useProductCartCount(id: Product["id"]) {
  const {
    state: {cart},
  } = React.useContext(CartContext);

  return getProductCount(cart, id);
}
