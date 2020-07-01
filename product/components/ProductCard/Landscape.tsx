import React from "react";
import {Box, Text, Flex, FlexProps, Stack, PseudoBox} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";
import {usePrice} from "~/i18n/hooks";
import TruncatedText from "~/ui/feedback/TruncatedText";

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
      _hover={{
        boxShadow: "md",
        backgroundColor: "gray.50",
      }}
      backgroundColor="white"
      borderBottomWidth={{base: 1, sm: 0}}
      borderWidth={{sm: 1}}
      boxShadow={isRaised ? "lg" : "none"}
      cursor={available ? "pointer" : "not-allowed"}
      opacity={available ? 1 : 0.5}
      paddingY={{base: 4, sm: 0}}
      rounded={{base: "none", sm: "md"}}
      transition="all 0.2s"
    >
      <Stack
        isInline
        alignItems={{base: "center", sm: "stretch"}}
        data-test-id="product"
        height="100%"
        justifyContent="space-between"
        position="relative"
        spacing={4}
        onClick={handleClick}
        {...props}
      >
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
          minHeight={{base: 24, sm: "9rem"}}
          padding={{base: 0, sm: 4}}
          paddingTop={0}
          width="100%"
        >
          <Stack marginBottom={2} spacing={1}>
            <TruncatedText fontWeight={500} lineHeight="normal" lines={2}>
              {title}
            </TruncatedText>
            {description && (
              <TruncatedText color="gray.500" display="block" fontSize="sm" lines={2}>
                {description}
              </TruncatedText>
            )}
          </Stack>
          <Flex alignItems="center">
            <Text
              color={available ? "green.500" : "yellow.500"}
              flex={1}
              fontSize="sm"
              fontWeight={500}
              lineHeight={1}
            >
              {available ? p(price) : `Sin stock`}
            </Text>
          </Flex>
        </Box>
        {image && (
          <Image
            height={{base: 24, sm: "auto"}}
            minHeight={{base: 24, sm: "9rem"}}
            roundedLeft={{base: "md", sm: "none"}}
            roundedRight="md"
            src={image || "/assets/fallback.jpg"}
            width={{base: 24, sm: "9rem"}}
          />
        )}
      </Stack>
    </PseudoBox>
  );
};

export default LandscapeProductCard;
