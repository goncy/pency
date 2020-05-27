import React from "react";
import faker from "faker";

import productMock from "../../mock";
import {SingleOption} from "../../types";

import ProductsList from "./ProductsList";

const option = (): SingleOption => ({
  type: "single",
  id: faker.random.uuid(),
  title: faker.commerce.productName(),
  options: [
    {
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    },
  ],
});

export const full = () => (
  <ProductsList
    products={[productMock(), productMock({options: [option()]}), productMock({image: null})]}
    width="100%"
    onEdit={() => {}}
    onRemove={() => Promise.resolve()}
  />
);

export default {title: "ProductsList"};
