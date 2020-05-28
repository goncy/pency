import faker from "faker";

export default {
  get withoutVariants() {
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
  get withoutImage() {
    return {
      ...this.withoutVariants,
      image: null,
    };
  },
  get variant() {
    return {
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      count: 5,
      options: [this.option, this.option, this.option],
    };
  },
  get option() {
    return {
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    };
  },
  get full() {
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
