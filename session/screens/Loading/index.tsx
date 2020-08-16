import React from "react";
import {Box} from "@chakra-ui/core";

import HeaderSkeleton from "./HeaderSkeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

import ProductsGrid from "~/product/components/ProductsGrid";
import Content from "~/ui/structure/Content";

const LoadingScreen: React.FC = () => (
  <>
    <HeaderSkeleton />
    <Content marginTop={{base: 20, sm: 40}} paddingX={{base: 0, sm: 4}}>
      <Box marginBottom={4} paddingX={{base: 4, sm: 0}}>
        <ProductsGrid layout="portrait">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </ProductsGrid>
      </Box>
    </Content>
  </>
);

export default LoadingScreen;
