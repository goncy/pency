import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../../mock";

import CartSummaryDrawer from "./CartSummaryDrawer";

import tenantMock from "~/tenant/mock";

export const open = () => (
  <CartSummaryDrawer
    isOpen
    fields={tenantMock.client.full.fields}
    items={mock.items}
    onCheckout={() => {
      action("checkout");

      return Promise.resolve();
    }}
    onClose={action("close")}
    onRemove={action("remove")}
  />
);

export const manyItems = () => (
  <CartSummaryDrawer
    isOpen
    fields={tenantMock.client.full.fields}
    items={[
      ...mock.items,
      ...mock.items,
      ...mock.items,
      ...mock.items,
      ...mock.items,
      ...mock.items,
    ]}
    onCheckout={() => {
      action("checkout");

      return Promise.resolve();
    }}
    onClose={action("close")}
    onRemove={action("remove")}
  />
);

export default {title: "Cart/Components/CartSummaryDrawer"};
