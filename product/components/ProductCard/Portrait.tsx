import React from "react";
import {Box, Text, Flex, Stack, FlexProps} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";
import {usePrice} from "~/i18n/hooks";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick: (product: Product) => void;
  isRaised?: boolean;
}

const PortraitProductCard: React.FC<Props> = ({isRaised = false, product, onClick, ...props}) => {
  const p = usePrice();
  const {image, title, price, originalPrice, visibility} = product;

  function handleClick() {
    onClick(product);
  }

  // If we get here by any point, return null
  if (visibility === "hidden") return null;

  return (
    <Flex
      alignItems="flex-end"
      boxShadow={isRaised ? "lg" : "none"}
      cursor="pointer"
      data-test-id="product"
      direction="column"
      justifyContent="space-between"
      position="relative"
      rounded="md"
      transition="transform 0.2s"
      onClick={handleClick}
      {...props}
    >
      <Image
        height={{base: 48, sm: 64}}
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
        <Text display="block" fontSize="md" fontWeight={500} lineHeight="normal" marginBottom={2}>
          {title}
        </Text>
        {visibility === "available" && (
          <Stack isInline alignItems="center">
            <Text color="green.500" fontSize="sm" fontWeight={500} lineHeight={1}>
              {p(price)}
            </Text>
            {originalPrice && (
              <Text color="gray.500" fontSize="sm" lineHeight={1} textDecoration="line-through">
                {p(price)}
              </Text>
            )}
          </Stack>
        )}
        {visibility === "unavailable" && (
          <Text color="yellow.500" fontSize="sm" fontWeight={500} lineHeight={1}>
            Sin stock
          </Text>
        )}
        {visibility === "ask" && (
          <Text color="green.500" fontSize="sm" fontWeight={500} lineHeight={1}>
            A consultar
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default PortraitProductCard;
