import faker from "faker";

import {Product} from "./types";

export default (overrides: Partial<Product> = {}) => ({
  id: faker.random.uuid(),
  category: faker.commerce.department(),
  image: `https://placehold.it/320x240`,
  description: faker.lorem.paragraph(),
  title: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  available: true,
  ...overrides,
});
