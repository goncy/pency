import React from "react";
import {Grid} from "@chakra-ui/core";

const ProductsGrid: React.FC = ({children}) => (
  <Grid
    autoRows="auto"
    gridGap={4}
    templateColumns={{
      base: "auto",
      sm: "repeat(auto-fill, minmax(auto, 340px))",
    }}
  >
    {children}
  </Grid>
);

export default ProductsGrid;
