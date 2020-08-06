import React from "react";
import {Box, Text, FlexProps, Stack, PseudoBox} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";
import {usePrice} from "~/i18n/hooks";
import TruncatedText from "~/ui/feedback/TruncatedText";
import {getVariantsPriceRange} from "~/product/selectors";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick?: (product: Product) => void;
  isRaised?: boolean;
}

const LandscapeProductCard: React.FC<Props> = ({isRaised = false, product, onClick, ...props}) => {
  const p = usePrice();
  const {image, title, price, originalPrice, description, type} = product;
  const [min, max] = getVariantsPriceRange(product.options);

  function handleClick() {
    onClick && onClick(product);
  }

  // If we get here by any point, return null
  if (type === "hidden") return null;

  return (
    <PseudoBox
      backgroundColor="white"
      borderBottomWidth={{base: 1, sm: 0}}
      borderWidth={{sm: 1}}
      boxShadow={isRaised ? "lg" : "none"}
      cursor={onClick ? "pointer" : "inherit"}
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
          {type === "available" && (
            <Stack isInline alignItems="center">
              <Text color="green.500" fontSize="sm" fontWeight={500} lineHeight={1}>
                {p(price)}
              </Text>
            </Stack>
          )}
          {type === "promotional" && (
            <Stack isInline alignItems="center">
              <Text color="green.500" fontSize="sm" fontWeight={500} lineHeight={1}>
                {p(price)}
              </Text>
              {originalPrice && (
                <Text color="gray.500" fontSize="sm" lineHeight={1} textDecoration="line-through">
                  {p(originalPrice)}
                </Text>
              )}
            </Stack>
          )}
          {type === "unavailable" && (
            <Text color="yellow.500" fontSize="sm" fontWeight={500} lineHeight={1}>
              Sin stock
            </Text>
          )}
          {type === "variant" && (
            <Text color="green.500" fontSize="sm" fontWeight={500} lineHeight={1}>
              {min === max ? p(min) : p(min)} ~ {p(max)}
            </Text>
          )}
          {type === "ask" && (
            <Text color="green.500" fontSize="sm" fontWeight={500} lineHeight={1}>
              A consultar
            </Text>
          )}
        </Box>
        {image && (
          <Image
            fadeIn
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
