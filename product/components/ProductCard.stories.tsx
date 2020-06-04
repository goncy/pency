import React from "react";
import {Box} from "@chakra-ui/core";

import productMock from "../mock";

import ProductCard from "./ProductCard";
import ProductsGrid from "./ProductsGrid";

export default {title: "Product/Components/ProductCard"};

export const noData = () => (
  <Box m={6}>
    <ProductsGrid>
      <ProductCard add={() => {}} product={productMock.withoutImage} />
    </ProductsGrid>
  </Box>
);

export const list = () => (
  <Box m={6}>
    <ProductsGrid>
      <ProductCard add={() => {}} product={productMock.full} />
      <ProductCard add={() => {}} product={productMock.full} />
      <ProductCard add={() => {}} product={productMock.full} />
      <ProductCard add={() => {}} product={productMock.full} />
      <ProductCard add={() => {}} product={productMock.full} />
    </ProductsGrid>
  </Box>
);
