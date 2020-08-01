import React from "react";
import {Grid, Text, StackProps, Stack} from "@chakra-ui/core";

interface Props extends StackProps {
  title?: string;
}

const ProductsCarousel: React.FC<Props> = ({children, title, ...props}) => (
  <Stack spacing={{base: 4, sm: 5}} {...props}>
    {title && (
      <Text as="h2" fontSize={{base: "lg", sm: "2xl"}} fontWeight={500}>
        {title}
      </Text>
    )}
    <Grid
      alignItems="flex-start"
      gridAutoColumns="minmax(280px,320px)"
      gridAutoFlow="column"
      gridGap={{base: 4, sm: 8}}
      overflowX="auto"
      overflowY="hidden"
      paddingBottom={4}
      {...props}
    >
      {children}
    </Grid>
  </Stack>
);

export default ProductsCarousel;
