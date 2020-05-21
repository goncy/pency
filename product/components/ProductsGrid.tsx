import React from "react";
import {Grid} from "@chakra-ui/core";

const ProductsGrid: React.FC = ({children}) => (
  <Grid
    autoRows="auto"
    gridGap={4}
    templateColumns={{
      base: "auto",
      sm: "repeat(auto-fill, minmax(320px,1fr))",
    }}
  >
    {children}
  </Grid>
);

export default ProductsGrid;
