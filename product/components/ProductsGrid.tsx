import React from "react";
import {Grid} from "@chakra-ui/core";

const ProductsGrid: React.FC = ({children}) => (
  <Grid
    autoRows="auto"
    gridGap={{base: 4, xl: 8}}
    templateColumns={{
      base: "auto",
      sm: "repeat(auto-fill, minmax(340px,1fr))",
    }}
  >
    {children}
  </Grid>
);

export default ProductsGrid;
