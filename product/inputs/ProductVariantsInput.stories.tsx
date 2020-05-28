import React from "react";

import productMock from "../mock";

import ProductVariantsInput from "./ProductVariantsInput";

export const empty = () => <ProductVariantsInput value={[]} onChange={() => {}} />;

export const full = () => (
  <ProductVariantsInput value={[productMock.variant]} onChange={() => {}} />
);

export const unlimitedVariants = () => (
  <ProductVariantsInput value={[{...productMock.variant, count: 0}]} onChange={() => {}} />
);

export default {title: "ProductVariantsInput"};
