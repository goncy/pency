import React from "react";
import {Grid} from "@chakra-ui/core";

const ProductsGrid: React.FC = ({children}) => (
  <Grid
    autoRows="auto"
    gridGap={{base: 4, sm: 8}}
    templateColumns={{
      base: "repeat(auto-fill, minmax(140px,1fr))",
      sm: "repeat(auto-fill, minmax(280px,1fr))",
    }}
  >
    {children}
  </Grid>
);

export default ProductsGrid;
