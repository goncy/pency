import React from "react";

import CartContext from "./context";
import {getTotal, getCount} from "./selectors";
import {CartItem} from "./types";

export function useCart() {
  const {
    state: {items, cart},
    actions: {add, remove, checkout},
  } = React.useContext(CartContext);

  return {
    add,
    remove,
    checkout,
    cart,
    items,
    count: getCount(items),
    total: getTotal(items),
  };
}

export function useProductCartCount(id: CartItem["product"]) {
  const {
    state: {items},
  } = React.useContext(CartContext);

  return items.filter((item) => item.product === id).reduce((count, item) => count + item.count, 0);
}
