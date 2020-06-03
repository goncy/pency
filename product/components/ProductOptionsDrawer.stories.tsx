import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../mock";

import ProductOptionsDrawer from "./ProductOptionsDrawer";

export const full = () => (
  <ProductOptionsDrawer
    isOpen
    options={mock.full.options}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export default {title: "Product/Components/ProductOptionsDrawer"};
