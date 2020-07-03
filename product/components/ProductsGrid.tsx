import React from "react";
import {Grid, Stack, Text, StackProps} from "@chakra-ui/core";

interface Props extends StackProps {
  title?: string;
  layout: "landscape" | "portrait";
}

const ProductsGrid: React.FC<Props> = ({children, title, layout, ...props}) => (
  <Stack spacing={{base: 4, sm: 5}} {...props}>
    {title && (
      <Text
        as="h2"
        data-test-id="title"
        fontSize={{base: "lg", sm: "2xl"}}
        fontWeight={500}
        textTransform="capitalize"
      >
        {title}
      </Text>
    )}
    {layout === "landscape" && (
      <Grid
        autoRows="auto"
        gridGap={{base: 0, sm: 8}}
        templateColumns={{
          base: "repeat(auto-fill, minmax(200px,1fr))",
          sm: "repeat(auto-fill, minmax(400px,1fr))",
        }}
      >
        {children}
      </Grid>
    )}
    {layout === "portrait" && (
      <Grid
        autoRows="auto"
        gridGap={{base: 4, sm: 8}}
        templateColumns={{
          base: "repeat(auto-fill, minmax(140px,1fr))",
          sm: "repeat(auto-fill, minmax(200px,1fr))",
        }}
      >
        {children}
      </Grid>
    )}
  </Stack>
);

export default ProductsGrid;
