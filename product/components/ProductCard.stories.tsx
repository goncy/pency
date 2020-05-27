import React from "react";
import {Box} from "@chakra-ui/core";

import productMock from "../mock";

import ProductCard from "./ProductCard";

export default {title: "ProductCard"};

export const noData = () => (
  <Box maxWidth="340px">
    <ProductCard add={() => {}} product={productMock()} remove={() => {}} />
  </Box>
);
