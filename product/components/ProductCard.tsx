import React from "react";
import {Box, Text, Flex, useDisclosure, FlexProps, PseudoBox} from "@chakra-ui/core";
import LazyLoad from "react-lazy-load";

import ProductDetails from "./ProductDetails";

import {Product} from "~/product/types";

interface Props extends FlexProps {
  product: Product;
  add: (product: Product) => void;
  isRaised?: boolean;
}

const ProductCard: React.FC<Props> = ({isRaised = false, product, add, ...props}) => {
  const {image, description, title, price} = product;
  const {isOpen: isDetailsOpen, onToggle: toggleDetailsOpen} = useDisclosure();

  return (
    <>
      <PseudoBox
        _hover={{boxShadow: "md", borderColor: "gray.300"}}
        borderBottomWidth={{base: 1}}
        borderColor={{
          base: "gray.100",
          md: "gray.200",
        }}
        borderRadius={{
          base: isRaised ? "md" : 0,
          md: "md",
        }}
        borderWidth={{
          base: isRaised && 1,
          md: 1,
        }}
        boxShadow={{base: isRaised ? "md" : "none", md: "none"}}
        cursor="pointer"
        data-test-id="product"
        display="flex"
        flexDirection={{
          base: isRaised ? "column-reverse" : "row", // If isRaised show image first
          md: "row",
        }}
        height={{md: 40}}
        justifyContent="space-between"
        overflow="hidden"
        pb={{
          base: isRaised ? 0 : 5,
          md: 0,
        }}
        transition="box-shadow 0.2s, border-color 0.2s"
        onClick={toggleDetailsOpen}
        {...props}
      >
        <Flex
          direction="column"
          px={{base: isRaised ? 3 : 0, md: 6}}
          py={{base: isRaised ? 2 : 0, md: 5}}
        >
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
            <Text
              color="gray.500"
              display={{
                base: isRaised ? "none" : "-webkit-box",
                md: "-webkit-box",
              }}
              fontSize={{
                base: "sm",
                md: "md",
              }}
              mb={2}
              mt={0}
              overflow="hidden"
              style={{
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {description}
            </Text>
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
          backgroundColor={{base: isRaised && "gray.100", md: "transparent"}}
          flexShrink={0}
          height={isRaised && "32"}
          ml={{
            base: isRaised ? 0 : 3,
            md: 3,
          }}
          size={{
            base: 20,
            md: 40,
          }}
          width={isRaised && "40"}
        >
          {image && (
            <LazyLoad height="100%" offsetVertical={512} width="100%">
              <Box
                backgroundImage={`url(${image})`}
                backgroundPosition="center"
                backgroundSize="cover"
                borderBottomWidth={{
                  base: isRaised && 1,
                  md: 0,
                }}
                borderColor="gray.100"
                borderLeftWidth={{
                  md: 1,
                }}
                borderRadius={{
                  base: isRaised ? 0 : 4,
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
