import {Cart, CartItem} from "./types";

import {getOptionsString, getPrice} from "~/product/selectors";
import {groupBy} from "~/selectors/group";

export function getSimplifiedCart(cart: Cart) {
  const {options = [], ...rest} = groupBy(cart, (item) =>
    item.product.options?.length ? "options" : item.product.id,
  );

  return Object.values(rest)
    .reduce<any>((acc, items) => {
      const {
        id,
        product: {price, category, subcategory, title, description},
      } = items[0];

      return acc.concat({
        id,
        category,
        subcategory,
        description,
        count: items.length,
        title: title,
        price: Number(price) * items.length,
      });
    }, [])
    .concat(
      options.map(({id, product}) => {
        const {category, subcategory, title, description, options} = product;

        return {
          id,
          count: 1,
          category,
          subcategory,
          price: getPrice(product),
          title,
          description,
          options: getOptionsString(options),
        };
      }),
    )
    .filter(Boolean);
}

export function getTotal(cart: Cart): number {
  return cart.reduce((total, {product}) => total + getPrice(product), 0);
}

export function getSummary(cart: Cart): string {
  return `[${getTotal(cart)}] ${cart.map(({product}) => product.title).join(", ")}`;
}

export function getProductCount(cart: Cart, id: CartItem["product"]["id"]): number {
  return cart.filter((item) => item.product.id === id).length || 0;
}
