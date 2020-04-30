import {Cart, CartItem} from "./types";

import {getOptionsString, getPrice} from "~/product/selectors";

export function getSimplifiedCart(cart: Cart) {
  return cart.map(({product}) => {
    const {category, subcategory, title, description, options} = product;

    return {
      category,
      subcategory,
      price: getPrice(product),
      title,
      description,
      options: getOptionsString(options),
    };
  });
}

export function getTotal(cart: Cart): number {
  return cart.reduce((total, {product}) => total + getPrice(product), 0);
}

export function getProductCount(cart: Cart, id: CartItem["product"]["id"]): number {
  return cart.filter((item) => item.product.id === id).length || 0;
}
