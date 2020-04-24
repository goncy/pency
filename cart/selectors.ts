import {Cart} from "./types";

import {getOptionsString} from "~/product/selectors";

export function simplify(cart: Cart) {
  return cart.map(({product: {category, subcategory, price, title, description, options}}) => ({
    category,
    subcategory,
    price,
    title,
    description,
    options: options && getOptionsString(options),
  }));
}
