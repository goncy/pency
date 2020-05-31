import React from "react";

import productMock from "../../mock";

import ProductsList from "./ProductsList";

export const full = () => (
  <ProductsList
    products={[productMock.withoutVariants, productMock.full, productMock.withoutImage]}
    width="100%"
    onEdit={() => {}}
    onRemove={() => Promise.resolve()}
  />
);

export default {title: "Product/Components/ProductsList"};
