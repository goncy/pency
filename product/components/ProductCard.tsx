import React from "react";
import {Box, Text, Flex, Stack} from "@chakra-ui/core";

import ProductImage from "./ProductImage";
import ProductButtons from "./ProductButtons";

import {Product} from "~/product/types";
import {useProductCartCount} from "~/cart/hooks";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  onRemove: (id: Product["id"]) => void;
}

const ProductCard: React.FC<Props> = ({product, onRemove, onAdd}) => {
  const {id, image, description, title, price} = product;
  const count = useProductCartCount(id);
  const isInCart = Boolean(count);

  return (
    <>
      <Stack
        borderColor={isInCart ? "primary.500" : "gray.200"}
        borderWidth="1px"
        data-test-id="product"
        padding={4}
        rounded="lg"
        spacing={4}
        transition="transform 0.2s"
      >
        <Stack isInline spacing={4}>
          <Stack
            data-test-id="product-summary"
            display="flex"
            flex={1}
            height="100%"
            spacing={2}
            width="100%"
          >
            <Text display="block" fontSize="lg" fontWeight="semibold" lineHeight="normal" mb={2}>
              {title}
            </Text>
            {description && (
              <Text color="gray.500" mb={2}>
                {description}
              </Text>
            )}
          </Stack>
          {image && (
            <Box alignSelf="flex-start" data-test-id="product-image">
              <ProductImage image={image} />
            </Box>
          )}
        </Stack>
        <Flex
          alignItems="flex-end"
          data-test-id="product-add-btn"
          justifyContent="space-between"
          position="relative"
        >
          <Text
            color="primary.500"
            flex={1}
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            lineHeight="normal"
          >
            ${price}
          </Text>
          <ProductButtons count={count} product={product} onAdd={onAdd} onRemove={onRemove} />
        </Flex>
      </Stack>
    </>
  );
};

export default ProductCard;
