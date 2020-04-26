import React from "react";
import shortid from "shortid";
import template from "lodash.template";

import {Product} from "../product/types";

import {simplify} from "./selectors";
import {CartItem, Context, State, Actions, Cart} from "./types";

import {useAnalytics} from "~/analytics/hooks";
import {useTenant} from "~/tenant/hooks";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CartContext = React.createContext({} as Context);

const CartProvider = ({children}: Props) => {
  const log = useAnalytics();
  const {phone, message} = useTenant();
  const [cart, setCart] = React.useState<Cart>([]);

  function add(product: Product) {
    log("product_add", {
      content_type: "product",
      description: `[${product.category}] ${product.title}`,
      value: product.price,
    });

    setCart((cart) => cart.concat({id: shortid.generate(), product}));
  }

  function remove(id: CartItem["id"]) {
    setCart((cart) => cart.filter((item) => item.id !== id));
  }

  function checkout() {
    const compile = template(message);
    const text = compile({products: simplify(cart)});

    log("cart_checkout", {
      content_type: "cart",
      items: cart,
    });

    window.open(`https://wa.me/${phone}?text=${encodeURI(text)}`, "_blank");
  }

  const state: State = {cart};
  const actions: Actions = {add, remove, checkout};

  return <CartContext.Provider value={{state, actions}}>{children}</CartContext.Provider>;
};

export {CartProvider as Provider, CartContext as default};
