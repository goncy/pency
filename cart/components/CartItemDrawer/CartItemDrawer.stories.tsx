import React from "react";
import {action} from "@storybook/addon-actions";

import CartItemDrawer from "./CartItemDrawer";

import productMock from "~/product/mock";

export const open = () => (
  <CartItemDrawer
    isOpen
    product={productMock.full}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export default {title: "Cart/Components/CartItemDrawer"};
