import React from "react";
import {
  Stack,
  Box,
  Icon,
  PseudoBox,
  Flex,
  Text,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/core";

import ProductCard from "../components/ProductCard";
import {useFilteredProducts} from "../hooks";
import ProductsGrid from "../components/ProductsGrid";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartDrawer from "~/cart/components/CartDrawer";
import {filterBy} from "~/selectors/filter";

const ProductsScreen: React.FC = () => {
  const {add, count, total} = useCart();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});

  const productsByCategory = Object.entries(groupBy(products, (product) => product.category));
  const featuredProducts = filterBy(products, {featured: true});

  return (
    <>
      <Flex direction="column" height="100%" overflowY="hidden">
        <Box padding={4}>{filters}</Box>
        <Stack as="main" flex={1} overflowY="auto" padding={4} paddingTop={0} spacing={4}>
          {Boolean(featuredProducts.length) && (
            <Box>
              <Heading as="h2" mb={4} size="xl" textTransform="capitalize">
                Destacados
              </Heading>
              <ProductsGrid>
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} add={add} product={product} />
                ))}
              </ProductsGrid>
            </Box>
          )}
          {Boolean(products.length) ? (
            productsByCategory.map(([category, products]) => {
              const productsBySubcategory = Object.entries(
                groupBy(products, (product) => product.subcategory),
              );

              return (
                <PseudoBox key={category}>
                  <Flex direction="column">
                    <Heading as="h2" size="xl" textTransform="capitalize">
                      {category}
                    </Heading>
                    {productsBySubcategory.map(([subcategory, products]) => (
                      <PseudoBox key={subcategory} mt={4}>
                        <Flex direction="column">
                          {subcategory && (
                            <Heading as="h3" mb={4} size="lg" textTransform="capitalize">
                              {subcategory}
                            </Heading>
                          )}
                          <ProductsGrid>
                            {products.map((product) => (
                              <ProductCard key={product.id} add={add} product={product} />
                            ))}
                          </ProductsGrid>
                        </Flex>
                      </PseudoBox>
                    ))}
                  </Flex>
                </PseudoBox>
              );
            })
          ) : (
            <Flex
              alignItems="center"
              direction="column"
              flex={1}
              justifyContent="center"
              paddingX={4}
            >
              <Icon color="gray.200" mb={4} name="search" size="128px" />
              <Text color="gray.500" fontSize="lg" textAlign="center">
                No se encontraron productos
              </Text>
            </Flex>
          )}
        </Stack>
        {Boolean(count) && (
          <Flex
            alignItems="center"
            borderTopWidth="1px"
            display={["block", "flex"]}
            justifyContent="center"
            padding={2}
          >
            <Button
              backgroundColor="primary.500"
              color="white"
              variantColor="primary"
              w={{base: "100%", sm: "auto"}}
              onClick={openCart}
            >
              Revisar pedido (${total})
            </Button>
          </Flex>
        )}
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default ProductsScreen;
