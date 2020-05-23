import React from "react";
import {Flex, FlexProps, PseudoBox} from "@chakra-ui/core";

const ProductsCarousel: React.FC<FlexProps> = ({children, ...props}) => (
  <Flex overflowX="auto" paddingBottom={4} {...props}>
    {React.Children.map(children, (element) => (
      <PseudoBox
        _first={{paddingLeft: 4}}
        _last={{paddingRight: 4}}
        paddingRight={{base: 4, sm: 8}}
      >
        {element}
      </PseudoBox>
    ))}
  </Flex>
);

export default ProductsCarousel;
