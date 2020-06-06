import React from "react";
import shortid from "shortid";
import produce from "immer";

import {Product} from "../product/types";

import {CartItem, Context, State, Actions, Cart} from "./types";
import {getSummary, getMessage} from "./selectors";

import {useAnalytics} from "~/analytics/hooks";
import paymentApi from "~/payment/api/client";
import {useTenant} from "~/tenant/hooks";
import {getPrice, getOptionsString} from "~/product/selectors";
import {Field} from "~/tenant/types";
import {isMercadoPagoSelected} from "~/tenant/selectors";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CartContext = React.createContext({} as Context);

const CartProvider = ({children}: Props) => {
  const log = useAnalytics();
  const {phone, slug, mercadopago} = useTenant();
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
          const id = shortid.generate();

          cart[id] = {
            id,
            product: product.id,
            count: 1,
            category: product.category,
            price: getPrice(product),
            title: product.title,
            description: product.description,
            options: getOptionsString(product.options),
          };
        } else {
          if (cart[product.id]) {
            cart[product.id].count++;
          } else {
            cart[product.id] = {
              id: product.id,
              product: product.id,
              category: product.category,
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

  async function checkout(fields?: Field[]) {
    log("cart_checkout", {
      content_type: "cart",
      description: getSummary(items),
      items,
    });

    const orderId = shortid.generate();
    // We need to create the window reference before because Safari doesn't let us execute a window.open after an async operation
    let tab = window.open("", "_blank");
    let preference = null;

    try {
      preference =
        mercadopago && isMercadoPagoSelected(fields)
          ? await paymentApi.create(slug, items, orderId)
          : null;
    } catch (e) {
      console.log("Error generando preferencia de MercadoPago: ", e);
    }

    tab.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(
      getMessage(items, orderId, fields, preference),
    )}`;
  }

  const state: State = {items, cart};
  const actions: Actions = {add, remove, checkout};

  return <CartContext.Provider value={{state, actions}}>{children}</CartContext.Provider>;
};

export {CartProvider as Provider, CartContext as default};
