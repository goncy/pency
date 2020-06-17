import React from "react";
import {Box} from "@chakra-ui/core";
import {action} from "@storybook/addon-actions";

import productMock from "../mock";

import ProductCard from "./ProductCard";

export default {
  title: "Product/Components/ProductCard",
  decorators: [(storyFn) => <Box maxWidth="240px">{storyFn()}</Box>],
};

export const full = () => <ProductCard add={action("add")} product={productMock.full} />;

export const raised = () => <ProductCard isRaised add={action("add")} product={productMock.full} />;

export const noVariants = () => (
  <ProductCard add={action("add")} product={productMock.withoutVariants} />
);

export const noStock = () => (
  <ProductCard add={action("add")} product={{...productMock.withoutVariants, available: false}} />
);
