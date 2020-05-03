import React from "react";
import shortid from "shortid";
import template from "lodash.template";
import produce from "immer";

import {Product} from "../product/types";

import {CartItem, Context, State, Actions, Cart} from "./types";
import {getSummary} from "./selectors";

import {useAnalytics} from "~/analytics/hooks";
import {useTenant} from "~/tenant/hooks";
import {getPrice, getOptionsString} from "~/product/selectors";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CartContext = React.createContext({} as Context);

const CartProvider = ({children}: Props) => {
  const log = useAnalytics();
  const {phone, message} = useTenant();
  const [cart, setCart] = React.useState<Cart>({});
  const items = React.useMemo(() => [].concat(...Object.values(cart)), [cart]);

  function add(product: Product) {
    log("product_add", {
      content_type: "product",
      description: `[${product.category}] ${product.title}`,
      value: product.price,
    });

    setCart(
      produce((cart) => {
        if (product.options?.length) {
          const item = {
            id: shortid.generate(),
            product: product.id,
            count: 1,
            category: product.category,
            subcategory: product.subcategory,
            price: getPrice(product),
            title: product.title,
            description: product.description,
            options: getOptionsString(product.options),
          };

          if (cart["options"]) {
            cart["options"].push(item);
          } else {
            cart["options"] = [item];
          }
        } else {
          if (cart[product.id]) {
            cart[product.id].count++;
          } else {
            cart[product.id] = {
              id: product.id,
              product: product.id,
              category: product.category,
              subcategory: product.subcategory,
              description: product.description,
              title: product.title,
              price: product.price,
              count: 1,
            };
          }
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

  function checkout() {
    const compile = template(message);
    const text = compile({products: items});

    log("cart_checkout", {
      content_type: "cart",
      description: getSummary(items),
      items,
    });

    window.open(`https://wa.me/${phone}?text=${encodeURI(text)}`, "_blank");
  }

  const state: State = {items, cart};
  const actions: Actions = {add, remove, checkout};

  return <CartContext.Provider value={{state, actions}}>{children}</CartContext.Provider>;
};

export {CartProvider as Provider, CartContext as default};
