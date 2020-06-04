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
  PseudoBox,
} from "@chakra-ui/core";
import LazyLoad from "react-lazy-load";
import styled from "@emotion/styled";

import ProductDetails from "./ProductDetails";

import {Product} from "~/product/types";
import {useTranslation} from "~/hooks/translation";

const ProductDescription = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface Props extends FlexProps {
  product: Product;
  add: (product: Product) => void;
  isRaised?: boolean;
}

const ProductCard: React.FC<Props> = ({isRaised = false, product, add, ...props}) => {
  const {id, image, description, title, price, options} = product;
  const {isOpen: isDetailsOpen, onToggle: toggleDetailsOpen} = useDisclosure();

  // @TODO: Add isRaised

  const t = useTranslation();

  return (
    <>
      <PseudoBox
        _hover={{boxShadow: "md", borderColor: "gray.300"}}
        borderBottomWidth={1}
        borderColor={{
          base: "gray.100",
          md: "gray.200",
        }}
        borderRadius={{
          md: "md",
        }}
        borderWidth={{
          md: 1,
        }}
        cursor="pointer"
        data-test-id="product"
        display="flex"
        height={{md: 40}}
        justifyContent="space-between"
        overflow="hidden"
        pb={{
          base: 5,
          md: 0,
        }}
        transition="box-shadow 0.2s, border-color 0.2s"
        onClick={toggleDetailsOpen}
      >
        <Flex direction="column" px={{md: 6}} py={{md: 5}} {...props}>
          <Text
            display="block"
            fontSize={{
              base: "sm",
              md: "lg",
            }}
            fontWeight="semibold"
            lineHeight="normal"
            mb={1}
            mt={0}
          >
            {title}
          </Text>
          {description && (
            <ProductDescription
              color="gray.500"
              fontSize={{
                base: "sm",
                md: "md",
              }}
              mb={2}
              mt={0}
            >
              {description}
            </ProductDescription>
          )}
          <Text
            color="green.400"
            flex={1}
            fontSize={{
              base: "sm",
              md: "md",
            }}
            fontWeight="semibold"
            letterSpacing="wide"
            m={0}
          >
            ${price}
          </Text>
        </Flex>
        <Box
          flexShrink={0}
          ml={3}
          size={{
            base: 20,
            md: 40,
          }}
        >
          {image && (
            <LazyLoad height="100%" offsetVertical={512} width="100%">
              <Box
                backgroundColor="gray.100"
                backgroundImage={`url(${image})`}
                backgroundPosition="center"
                backgroundSize="cover"
                borderColor="gray.200"
                borderLeftWidth={{
                  md: 1,
                }}
                borderRadius={{
                  base: 4,
                  md: 0,
                }}
                cursor="pointer"
                flexShrink={0}
                size="100%"
              />
            </LazyLoad>
          )}
        </Box>
      </PseudoBox>
      {isDetailsOpen && <ProductDetails add={add} product={product} onClose={toggleDetailsOpen} />}
    </>
  );
};

export default ProductCard;
