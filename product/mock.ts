import faker from "faker";

import {Product, Variant, Option} from "./types";

export default {
  get withoutVariants(): Product {
    return {
      id: faker.random.uuid(),
      category: faker.commerce.department(),
      image: `https://placehold.it/320x240`,
      description: faker.lorem.paragraph(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      available: true,
      featured: true,
      options: [],
    };
  },
  get withoutImage(): Product {
    return {
      ...this.withoutVariants,
      image: null,
    };
  },
  get variant(): Variant {
    const options = [this.option, this.option, this.option];
    const option = this.option;

    return {
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      count: faker.random.number(5),
      required: faker.random.boolean(),
      options,
      value: [this.option, option, option],
    };
  },
  get option(): Option {
    return {
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    };
  },
  get full(): Product {
    return {
      ...this.withoutVariants,
      options: [
        {...this.variant, count: 0},
        {...this.variant, count: 5},
        {...this.variant, count: 1},
      ],
    };
  },
};
