import React from "react";
import {Stack, StackProps} from "@chakra-ui/core";

const ProductsCarousel: React.FC<StackProps> = ({children, ...props}) => (
  <Stack isInline overflowX="auto" paddingBottom={4} spacing={{base: 4, sm: 8}} {...props}>
    {children}
  </Stack>
);

export default ProductsCarousel;
