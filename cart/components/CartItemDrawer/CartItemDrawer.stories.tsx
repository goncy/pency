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

export default {title: "Cart/Components/CartItemDrawer"};
