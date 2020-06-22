import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../../mock";

import CartSummaryDrawer from "./CartSummaryDrawer";

import tenantMock from "~/tenant/mock";

export const open = () => (
  <CartSummaryDrawer
    isOpen
    fields={tenantMock.client.full.fields}
    items={[mock.item]}
    onCheckout={() => {
      action("checkout");

      return Promise.resolve();
    }}
    onClose={action("close")}
    onDecrease={action("decrease")}
    onIncrease={action("increase")}
  />
);

export const manyItems = () => (
  <CartSummaryDrawer
    isOpen
    fields={tenantMock.client.full.fields}
    items={[
      ...[mock.item, mock.item],
      ...[mock.item, mock.item],
      ...[mock.item, mock.item],
      ...[mock.item, mock.item],
      ...[mock.item, mock.item],
      ...[mock.item, mock.item],
    ]}
    onCheckout={() => {
      action("checkout");

      return Promise.resolve();
    }}
    onClose={action("close")}
    onDecrease={action("decrease")}
    onIncrease={action("increase")}
  />
);

export default {title: "Cart/Components/CartSummaryDrawer"};
