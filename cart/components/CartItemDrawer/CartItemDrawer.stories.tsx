import React from "react";
import {action} from "@storybook/addon-actions";

import CartItemDrawer from "./CartItemDrawer";

import productMock from "~/product/mock";

export const full = () => (
  <CartItemDrawer
    product={productMock.full}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const base = () => (
  <CartItemDrawer
    product={productMock.withoutImage}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const unavailable = () => (
  <CartItemDrawer
    product={{...productMock.full, type: "unavailable"}}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const variant = () => (
  <CartItemDrawer
    product={{...productMock.full, type: "variant"}}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const ask = () => (
  <CartItemDrawer
    product={{...productMock.full, type: "ask"}}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const hidden = () => (
  <CartItemDrawer
    product={{...productMock.full, type: "hidden"}}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export default {title: "Cart/Components/CartItemDrawer"};
