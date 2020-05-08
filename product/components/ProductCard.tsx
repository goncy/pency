import React from "react";
import {Box, Text, Flex, Stack, Button, useDisclosure, ButtonGroup} from "@chakra-ui/core";
import LazyLoad from "react-lazy-load";

import ProductOptionsDrawer from "./ProductOptionsDrawer";
import ProductImageModal from "./ProductImageModal";

import {Product} from "~/product/types";
import {useProductCartCount} from "~/cart/hooks";

interface Props {
  product: Product;
  add: (product: Product) => void;
  remove: (id: Product["id"]) => void;
}

const ProductCard: React.FC<Props> = ({product, remove, add}) => {
  const {id, image, description, title, price, options} = product;
  const {isOpen: isImageOpen, onToggle: toggleImage} = useDisclosure();
  const {isOpen: isOptionsOpen, onToggle: toggleOptions} = useDisclosure();
  const count = useProductCartCount(id);
  const hasOptions = Boolean(product.options?.length);
  const isInCart = Boolean(count);

  function handleAdd() {
    if (hasOptions) {
      return toggleOptions();
    }

    return add(product);
  }

  function handleRemove() {
    remove(product.id);
  }

  function handleAddWithOptions(options) {
    toggleOptions();

    return add({...product, options});
  }

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
          <Box alignSelf="flex-start" data-test-id="product-image">
            {image && (
              <LazyLoad height={96} offsetVertical={512}>
                <Box
                  backgroundImage={`url(${image})`}
                  backgroundPosition="center"
                  backgroundSize="cover"
                  border={1}
                  borderColor="gray.100"
                  borderStyle="solid"
                  cursor="pointer"
                  flexShrink={0}
                  height={24}
                  rounded="lg"
                  width={24}
                  onClick={toggleImage}
                />
              </LazyLoad>
            )}
          </Box>
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
          {!hasOptions && isInCart ? (
            <ButtonGroup width={24}>
              <Button onClick={handleRemove}>-</Button>
              <Button onClick={handleAdd}>+</Button>
            </ButtonGroup>
          ) : (
            <Button width={24} onClick={handleAdd}>
              Agregar
            </Button>
          )}
          {isInCart && (
            <Flex
              alignItems="center"
              backgroundColor="primary.500"
              border="2px solid white"
              borderRadius="50%"
              color="white"
              fontSize="16px"
              height="26px"
              justifyContent="center"
              position="absolute"
              right="-13px"
              top="-13px"
              width="26px"
              zIndex={1}
            >
              {count}
            </Flex>
          )}
        </Flex>
      </Stack>
      <ProductImageModal image={image} isOpen={isImageOpen} onClose={toggleImage} />
      <ProductOptionsDrawer
        isOpen={hasOptions && isOptionsOpen}
        options={options}
        onClose={toggleOptions}
        onSubmit={handleAddWithOptions}
      />
    </>
  );
};

export default ProductCard;
