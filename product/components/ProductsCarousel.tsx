import React from "react";
import {Grid, Text, StackProps, Stack} from "@chakra-ui/core";

interface Props extends StackProps {
  title?: string;
}

const ProductsCarousel: React.FC<Props> = ({children, title, ...props}) => (
  <Stack spacing={{base: 4, sm: 5}} {...props}>
    {title && (
      <Text fontSize={{base: "lg", sm: "2xl"}} fontWeight={500}>
        {title}
      </Text>
    )}
    <Grid
      autoRows={"auto"}
      gridAutoColumns={{base: "160px", md: "auto"}}
      gridAutoFlow={{
        base: "column",
        md: "row",
      }}
      gridColumnGap={{base: 2, md: 8}}
      gridRowGap={{base: 4, md: 6}}
      marginX={{base: -4, md: 0}}
      overflowX="auto"
      overflowY="hidden"
      paddingBottom={4}
      paddingX={{base: 4, md: 0}}
      templateColumns={{
        md: "repeat(auto-fill, minmax(440px,1fr))",
      }}
      {...props}
    >
      {children}
    </Grid>
  </Stack>
);

export default ProductsCarousel;
