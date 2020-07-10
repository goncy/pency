import React from "react";
import {action} from "@storybook/addon-actions";

import CartItemDrawer from "./CartItemDrawer";

import productMock from "~/product/mock";

export const full = () => (
  <CartItemDrawer
    isOpen
    product={productMock.full}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const base = () => (
  <CartItemDrawer
    isOpen
    product={productMock.withoutImage}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const unavailable = () => (
  <CartItemDrawer
    isOpen
    product={{...productMock.full, visibility: "unavailable"}}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const ask = () => (
  <CartItemDrawer
    isOpen
    product={{...productMock.full, visibility: "ask"}}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const hidden = () => (
  <CartItemDrawer
    isOpen
    product={{...productMock.full, visibility: "hidden"}}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export default {title: "Cart/Components/CartItemDrawer"};
