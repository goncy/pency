import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../../mock";

import ProductsList from "./ProductsList";

export const full = () => (
  <ProductsList
    products={[mock.withoutVariants, mock.full, mock.withoutImage]}
    width="100%"
    onEdit={action("edit")}
    onRemove={() => Promise.resolve(action("remove")())}
  />
);

export default {title: "Product/Components/ProductsList"};
