import React from "react";
import {action} from "@storybook/addon-actions";

import productMock from "../../mock";

import ProductVariantsInput from ".";

export const empty = () => <ProductVariantsInput value={[]} onChange={action("change")} />;
export const full = () => (
  <ProductVariantsInput value={[productMock.variant]} onChange={action("change")} />
);
export const unlimitedVariants = () => (
  <ProductVariantsInput value={[{...productMock.variant, count: 0}]} onChange={action("change")} />
);

export default {title: "Product/Inputs/ProductVariantsInput"};
