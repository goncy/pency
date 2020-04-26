import React from "react";

import CartContext from "./context";

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
    total: cart.reduce((total, {product}) => Number(total) + Number(product.price), 0),
  };
}

export function useProductCartCount(id: Product["id"]) {
  const {
    state: {cart},
  } = React.useContext(CartContext);

  return cart.filter((item) => item.product.id === id).length || 0;
}
