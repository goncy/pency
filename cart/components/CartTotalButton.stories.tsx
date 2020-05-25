import React from "react";
import faker from "faker";
import {Box} from "@chakra-ui/core";

import CartTotalButton from "./CartTotalButton";

const item = () => ({
  id: faker.random.uuid(),
  product: faker.random.uuid(),
  count: faker.random.number(20),
  category: faker.commerce.department(),
  subcategory: faker.commerce.department(),
  price: Number(faker.commerce.price()),
  title: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  options: faker.commerce.product(),
});

export const full = () => (
  <Box maxWidth="340px">
    <CartTotalButton items={[item(), item(), item()]} onClick={() => {}} />
  </Box>
);

export default {title: "CartTotalButton"};
