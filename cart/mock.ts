import faker from "faker";

import {CartItem} from "./types";

import productMock from "~/product/mock";

export default {
  get item(): CartItem {
    return {
      id: faker.random.uuid(),
      count: 2,
      note: "Some additional note",
      product: productMock.full,
      variants: [productMock.variant, productMock.variant],
    };
  },
  get itemWithoutVariants(): CartItem {
    return {
      ...this.item,
      variants: [],
    };
  },
};
