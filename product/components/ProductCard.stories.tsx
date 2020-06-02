import React from "react";
import {Box} from "@chakra-ui/core";
import {action} from "@storybook/addon-actions";

import productMock from "../mock";

import ProductCard from "./ProductCard";

export default {title: "Product/Components/ProductCard"};

export const noData = () => (
  <Box maxWidth="340px">
    <ProductCard
      add={action("add")}
      product={productMock.withoutVariants}
      remove={action("remove")}
    />
  </Box>
);
