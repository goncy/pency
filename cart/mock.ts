import faker from "faker";

import {CartItem} from "./types";

export default {
  get items(): CartItem[] {
    return [this.item, this.item];
  },
  get item(): CartItem {
    return {
      id: faker.random.uuid(),
      category: faker.commerce.department(),
      count: 2,
      description: faker.lorem.words(10),
      price: Number(faker.commerce.price(10, 100)),
      product: faker.random.uuid(),
      title: faker.commerce.product(),
      options: faker.lorem.words(10),
    };
  },
};
