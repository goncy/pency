import React from "react";
import {Box, Text, Flex, FlexProps, Stack} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick: (product: Product) => void;
  isRaised?: boolean;
}

const ProductCard: React.FC<Props> = ({isRaised = false, product, onClick, ...props}) => {
  const {image, title, price, available} = product;

  function handleClick() {
    available && onClick(product);
  }

  return (
    <Flex
      alignItems="flex-end"
      boxShadow={isRaised ? "lg" : "none"}
      cursor={available ? "pointer" : "not-allowed"}
      data-test-id="product"
      direction="column"
      justifyContent="space-between"
      opacity={available ? 1 : 0.5}
      position="relative"
      rounded="md"
      transition="transform 0.2s"
      onClick={handleClick}
      {...props}
    >
      <Image
        height={{base: 48, sm: 56}}
        rounded="md"
        src={image || "/assets/fallback.jpg"}
        width="100%"
      />
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
        padding={isRaised ? {base: 2, sm: 4} : 0}
        paddingTop={2}
        width="100%"
      >
        <Stack marginBottom={2} spacing={{base: 1, sm: 2}}>
          <Text
            display="block"
            fontSize={{base: "md", sm: "md"}}
            fontWeight={500}
            lineHeight="normal"
          >
            {title}
          </Text>
        </Stack>
        <Flex alignItems="center">
          <Text
            color={available ? "green.500" : "yellow.500"}
            flex={1}
            fontSize={{base: "sm", sm: "md"}}
            fontWeight={500}
            lineHeight={1}
          >
            {available ? `$${price}` : `Sin stock`}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductCard;
