import React from "react";
import {action} from "@storybook/addon-actions";

import productMock from "../mock";

import ProductForm from "./ProductForm";

const CATEGORIES = ["some", "categories"];

export const create = () => (
  <ProductForm categories={CATEGORIES} defaultValues={{}} onSubmit={action("submit")}>
    {({form}) => form}
  </ProductForm>
);

export const edit = () => (
  <ProductForm
    categories={CATEGORIES}
    defaultValues={productMock.withoutVariants}
    onSubmit={action("submit")}
  >
    {({form}) => form}
  </ProductForm>
);

export const noCategories = () => (
  <ProductForm
    categories={[]}
    defaultValues={productMock.withoutVariants}
    onSubmit={action("submit")}
  >
    {({form}) => form}
  </ProductForm>
);

export default {title: "Product/Forms/ProductForm"};
