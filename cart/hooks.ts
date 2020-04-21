import React from "react";

import CartContext from "./context";

export function useCart() {
  const {
    state: {cart},
    actions: {add, remove},
  } = React.useContext(CartContext);

  const items = Object.values(cart);

  return {
    add,
    remove,
    cart,
    items,
    count: items.reduce((total, {count}) => Number(total) + count, 0),
    total: items.reduce(
      (total, {product, count}) => Number(total) + Number(product.price) * count,
      0,
    ),
  };
}
