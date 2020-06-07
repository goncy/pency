import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../mock";

import ProductDrawer from "./ProductDrawer";

const CATEGORIES = ["some", "categories"];

export const edit = () => (
  <ProductDrawer
    isOpen
    categories={CATEGORIES}
    defaultValues={mock.full}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export const create = () => (
  <ProductDrawer
    isOpen
    categories={CATEGORIES}
    defaultValues={undefined}
    onClose={action("close")}
    onSubmit={action("submit")}
  />
);

export default {title: "Product/Components/ProductDrawer"};
