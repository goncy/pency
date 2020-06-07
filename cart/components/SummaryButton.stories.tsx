import React from "react";
import faker from "faker";
import {action} from "@storybook/addon-actions";

import SummaryButton from "./SummaryButton";

const item = () => ({
  id: faker.random.uuid(),
  product: faker.random.uuid(),
  count: faker.random.number(20),
  category: faker.commerce.department(),
  price: Number(faker.commerce.price()),
  title: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  options: faker.commerce.product(),
});

export const full = () => (
  <SummaryButton items={[item(), item(), item()]} maxWidth="320px" onClick={action("clicked")}>
    Tu pedido
  </SummaryButton>
);

export default {title: "Cart/Components/SummaryButton"};
