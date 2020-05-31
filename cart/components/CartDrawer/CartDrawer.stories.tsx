import React from "react";
import faker from "faker";

import CartDrawer from ".";

import tenantMock from "~/tenant/mock";

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

export const open = () => (
  <CartDrawer
    isOpen
    fields={tenantMock.full.fields}
    items={[item(), item()]}
    onCheckout={() => {}}
    onClose={() => {}}
    onRemove={() => {}}
  />
);

export default {title: "Cart/Components/CartDrawer"};
