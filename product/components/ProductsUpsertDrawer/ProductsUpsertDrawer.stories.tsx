import React from "react";
import {action} from "@storybook/addon-actions";

import ProductsUpsertDrawer from "./ProductsUpsertDrawer";

import mock from "~/product/mock";

export const base = () => (
  <ProductsUpsertDrawer
    defaultValues={[mock.full, mock.full]}
    onClose={action("close")}
    onSubmit={(products) => Promise.resolve(action("submit")(products))}
  />
);

export default {title: "Product/Components/ProductsUpsertDrawer"};
