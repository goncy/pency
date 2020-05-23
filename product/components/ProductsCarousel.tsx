import React from "react";
import {Grid, GridProps} from "@chakra-ui/core";

const ProductsCarousel: React.FC<GridProps> = ({children, ...props}) => (
  <Grid
    gridAutoFlow="column"
    gridGap={{base: 4, sm: 8}}
    overflowX="auto"
    overflowY="hidden"
    paddingBottom={4}
    templateColumns="repeat(auto-fill, minmax(280px,1fr))"
    {...props}
  >
    {children}
  </Grid>
);

export default ProductsCarousel;
