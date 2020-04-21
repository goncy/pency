import React from "react";
import {Box, Text, Flex, Badge, Button, ButtonGroup} from "@chakra-ui/core";

import {Product} from "~/product/types";

interface Props {
  product: Product;
  add: () => void;
  remove: () => void;
  count: number;
}

const ProductCard: React.FC<Props> = ({product, count, add, remove}) => {
  const {category, image, description, title, price} = product;

  return (
    <Flex
      alignItems="flex-end"
      alignSelf="flex-end"
      borderColor={Boolean(count) ? "primary.500" : "gray.200"}
      borderWidth="1px"
      direction="column"
      justifyContent="space-between"
      position="relative"
      rounded="lg"
      transition="transform 0.2s"
    >
      {Boolean(count) && (
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
        >
          {count}
        </Flex>
      )}
      {image && (
        <Box
          backgroundImage={`url(${image})`}
          backgroundPosition="center"
          backgroundSize="cover"
          borderBottom={1}
          flexShrink={0}
          height={64}
          roundedTop="lg"
          width="100%"
        />
      )}
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
        p={4}
        width="100%"
      >
        <Flex direction="column">
          <Badge mb={2} variantColor="primary" width="fit-content">
            {category}
          </Badge>
          <Text display="block" fontSize="lg" fontWeight="semibold" lineHeight="normal">
            {title}
          </Text>
          <Text color="gray.500" my={2}>
            {description}
          </Text>
        </Flex>
        <Flex alignItems="flex-end">
          <Text
            color="primary.500"
            flex={1}
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            ${price}
          </Text>
          {count ? (
            <ButtonGroup spacing={2}>
              <Button onClick={remove}>-</Button>
              <Button onClick={add}>+</Button>
            </ButtonGroup>
          ) : (
            <Button onClick={add}>Agregar</Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductCard;
