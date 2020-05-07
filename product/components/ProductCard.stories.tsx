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
      image: faker.image.food(),
      description: faker.lorem.paragraph(),
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      available: true,
    }}
    remove={() => {}}
  />
);
