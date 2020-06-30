import React from "react";
import {Box, Text, Flex, FlexProps, Stack, PseudoBox} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";
import {usePrice} from "~/i18n/hooks";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick: (product: Product) => void;
  isRaised?: boolean;
}

const LandscapeProductCard: React.FC<Props> = ({isRaised = false, product, onClick, ...props}) => {
  const p = usePrice();
  const {image, title, price, available, description} = product;

  function handleClick() {
    available && onClick(product);
  }

  return (
    <PseudoBox
      _first={{borderTopWidth: 1}}
      borderBottomWidth={{base: 1, sm: 0}}
      borderWidth={{sm: 1}}
      boxShadow={isRaised ? "lg" : "none"}
      cursor={available ? "pointer" : "not-allowed"}
      opacity={available ? 1 : 0.5}
      paddingX={{base: 0, sm: 4}}
      paddingY={{base: 4, sm: 4}}
      rounded={{base: "none", sm: "md"}}
      transition="transform 0.2s"
    >
      <Stack
        isInline
        alignItems="flex-start"
        data-test-id="product"
        justifyContent="space-between"
        position="relative"
        spacing={2}
        onClick={handleClick}
        {...props}
      >
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
          paddingTop={0}
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
            <Text color="gray.500" display="block" fontSize="sm" lineHeight="normal">
              {description?.length > 30 ? description.slice(0, 27).concat("...") : description}
            </Text>
          </Stack>
          <Flex alignItems="center">
            <Text
              color={available ? "green.500" : "yellow.500"}
              flex={1}
              fontSize={{base: "xs", sm: "sm"}}
              fontWeight={500}
              lineHeight={1}
            >
              {available ? p(price) : `Sin stock`}
            </Text>
          </Flex>
        </Box>
        <Image
          height={{base: 16, sm: 24}}
          rounded="md"
          src={image || "/assets/fallback.jpg"}
          width={{base: 16, sm: 24}}
        />
      </Stack>
    </PseudoBox>
  );
};

export default LandscapeProductCard;
