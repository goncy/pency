import React from "react";
import {action} from "@storybook/addon-actions";

import productMock from "../../mock";

import ProductsList from "./ProductsList";

export const full = () => (
  <ProductsList
    products={[productMock.withoutVariants, productMock.full, productMock.withoutImage]}
    width="100%"
    onEdit={action("edit")}
    onRemove={() => Promise.resolve(action("remove")())}
  />
);

export default {title: "Product/Components/ProductsList"};
