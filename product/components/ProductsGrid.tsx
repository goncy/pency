import React from "react";
import {Grid} from "@chakra-ui/core";

const ProductsGrid: React.FC = ({children}) => (
  <Grid
    autoRows="auto"
    gridColumnGap={{md: 8}}
    gridRowGap={{base: 4, md: 6}}
    templateColumns={{
      base: "auto",
      sm: "repeat(auto-fill, minmax(440px,1fr))",
    }}
  >
    {children}
  </Grid>
);

export default ProductsGrid;
