import React from "react";
import {Grid, Stack, Text, StackProps} from "@chakra-ui/core";

interface Props extends StackProps {
  title?: string;
}

const ProductsGrid: React.FC<Props> = ({children, title, ...props}) => (
  <Stack spacing={{base: 4, sm: 5}} {...props}>
    {title && (
      <Text data-test-id="title" fontSize={{base: "lg", sm: "2xl"}} fontWeight={500}>
        {title}
      </Text>
    )}
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
  </Stack>
);

export default ProductsGrid;
