import React from "react";
import faker from "faker";

import ProductCard from "./ProductCard";

export default {title: "ProductCard"};

export const noData = () => (
  <ProductCard
    add={() => {}}
    product={{
      id: faker.random.uuid(),
      category: faker.commerce.department(),
      image: `https://placehold.it/320x240`,
      description: faker.lorem.paragraph(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      available: true,
    }}
    remove={() => {}}
  />
);
