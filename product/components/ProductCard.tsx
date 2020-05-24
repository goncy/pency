import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  useDisclosure,
  ButtonGroup,
  FlexProps,
  Stack,
} from "@chakra-ui/core";
import LazyLoad from "react-lazy-load";

import ProductOptionsDrawer from "./ProductOptionsDrawer";
import ProductImageModal from "./ProductImageModal";

import {Product} from "~/product/types";
import {useProductCartCount} from "~/cart/hooks";
import TruncatedText from "~/ui/feedback/TruncatedText";
import {useTranslation} from "~/hooks/translation";

interface Props extends FlexProps {
  product: Product;
  add: (product: Product) => void;
  remove: (id: Product["id"]) => void;
  isRaised?: boolean;
}

const ProductCard: React.FC<Props> = ({isRaised = false, product, remove, add, ...props}) => {
  const {id, image, description, title, price, options} = product;
  const {isOpen: isImageOpen, onToggle: toggleImage} = useDisclosure();
  const {isOpen: isOptionsOpen, onToggle: toggleOptions} = useDisclosure();
  const {t} = useTranslation();
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
      <Flex
        alignItems="flex-end"
        boxShadow={isRaised ? "lg" : "none"}
        data-test-id="product"
        direction="column"
        justifyContent="space-between"
        position="relative"
        rounded="md"
        transition="transform 0.2s"
        {...props}
      >
        {image ? (
          <LazyLoad height={192} offsetVertical={512} width="100%">
            <Box
              backgroundImage={`url(${image})`}
              backgroundPosition="center"
              backgroundSize="cover"
              borderBottom={1}
              borderBottomStyle="solid"
              borderColor="gray.100"
              cursor="pointer"
              flexShrink={0}
              height={48}
              rounded="md"
              width="100%"
              onClick={toggleImage}
            />
          </LazyLoad>
        ) : (
          <Flex
            alignItems="center"
            backgroundColor="gray.100"
            borderBottom={1}
            borderBottomStyle="solid"
            borderColor="gray.100"
            flexShrink={0}
            height={48}
            justifyContent="center"
            rounded="md"
            width="100%"
          >
            <Text color="gray.500" fontSize="2xl">
              {t("productCard.noImage")}
            </Text>
          </Flex>
        )}
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
              fontSize={{base: "sm", sm: "lg"}}
              fontWeight={500}
              lineHeight="normal"
            >
              {title}
            </Text>
            {description && (
              <TruncatedText
                color="gray.500"
                fontSize={{base: "xs", sm: "md"}}
                fontWeight="normal"
                lines={3}
              >
                {description}
              </TruncatedText>
            )}
          </Stack>
          <Flex alignItems="center">
            <Text
              color="green.500"
              flex={1}
              fontSize={{base: "sm", sm: "md"}}
              fontWeight={500}
              lineHeight={1}
            >
              ${price}
            </Text>
            <Box position="relative">
              {!hasOptions && isInCart ? (
                <ButtonGroup>
                  <Button fontWeight={500} size="xs" onClick={handleRemove}>
                    -
                  </Button>
                  <Button fontWeight={500} size="xs" onClick={handleAdd}>
                    +
                  </Button>
                </ButtonGroup>
              ) : (
                <Button fontWeight={500} size="xs" onClick={handleAdd}>
                  {t("productCard.add")}
                </Button>
              )}
              {isInCart && (
                <Flex
                  alignItems="center"
                  backgroundColor="primary.500"
                  border="2px solid white"
                  borderRadius="50%"
                  color="white"
                  fontSize="10px"
                  fontWeight="500"
                  height="20px"
                  justifyContent="center"
                  lineHeight={1}
                  position="absolute"
                  right="-10px"
                  top="-10px"
                  width="20px"
                  zIndex={1}
                >
                  {count}
                </Flex>
              )}
            </Box>
          </Flex>
        </Box>
      </Flex>
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
