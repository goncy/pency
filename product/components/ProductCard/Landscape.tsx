import React from "react";
import {Box, Text, FlexProps, Stack, PseudoBox} from "@chakra-ui/core";

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
  const {image, title, price, originalPrice, description, visibility} = product;

  function handleClick() {
    onClick(product);
  }

  // If we get here by any point, return null
  if (visibility === "hidden") return null;

  return (
    <PseudoBox
      backgroundColor="white"
      borderBottomWidth={{base: 1, sm: 0}}
      borderWidth={{sm: 1}}
      boxShadow={isRaised ? "lg" : "none"}
      cursor="pointer"
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
