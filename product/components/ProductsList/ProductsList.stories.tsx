import React from "react";
import faker from "faker";

import ProductsList from "./ProductsList";

const product = () => ({
  id: faker.random.uuid(),
  category: faker.commerce.department(),
  image: `https://placehold.it/320x240`,
  description: faker.lorem.paragraph(),
  title: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  available: true,
});

export const full = () => (
  <ProductsList
    products={[product(), product(), {...product(), image: null}]}
    width="100%"
    onEdit={() => {}}
    onRemove={() => Promise.resolve()}
  />
);

export default {title: "ProductsList"};
