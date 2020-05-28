import React from "react";

import productMock from "../mock";

import ProductDrawer from "./ProductDrawer";

const CATEGORIES = ["some", "categories"];

export const edit = () => (
  <ProductDrawer
    isOpen
    categories={CATEGORIES}
    defaultValues={productMock.full}
    onClose={() => {}}
    onSubmit={() => {}}
  />
);

export const create = () => (
  <ProductDrawer
    isOpen
    categories={CATEGORIES}
    defaultValues={undefined}
    onClose={() => {}}
    onSubmit={() => {}}
  />
);

export default {title: "ProductDrawer"};
