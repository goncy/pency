import React from "react";

import productMock from "../mock";

import ProductForm from "./ProductForm";

const CATEGORIES = ["some", "categories"];

export const create = () => (
  <ProductForm categories={CATEGORIES} defaultValues={{}} onSubmit={() => {}}>
    {({form}) => form}
  </ProductForm>
);

export const edit = () => (
  <ProductForm
    categories={CATEGORIES}
    defaultValues={productMock.withoutVariants}
    onSubmit={() => {}}
  >
    {({form}) => form}
  </ProductForm>
);

export const noCategories = () => (
  <ProductForm categories={[]} defaultValues={productMock.withoutVariants} onSubmit={() => {}}>
    {({form}) => form}
  </ProductForm>
);

export default {title: "ProductForm"};
