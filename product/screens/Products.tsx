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
  Badge,
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
  const {add, remove, count, total} = useCart();
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
              <Heading as="h2" mb={4} size="xl">
                Destacados
              </Heading>
              <ProductsGrid>
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} add={add} product={product} remove={remove} />
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
                    <Heading as="h2" size="xl">
                      {category}
                    </Heading>
                    {productsBySubcategory.map(([subcategory, products]) => (
                      <PseudoBox key={subcategory} mt={4}>
                        <Flex direction="column">
                          {subcategory && (
                            <Heading as="h3" mb={4} size="lg">
                              {subcategory}
                            </Heading>
                          )}
                          <ProductsGrid>
                            {products.map((product) => (
                              <ProductCard
                                key={product.id}
                                add={add}
                                product={product}
                                remove={remove}
                              />
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
              data-test-id="empty"
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
          {Boolean(count) && (
            <Flex
              alignItems="center"
              bottom={0}
              boxShadow="0 0 6px currentColor"
              color="primary.500"
              display="block"
              justifyContent="center"
              margin={{base: 0, sm: "auto"}}
              position="sticky"
              rounded={4}
              zIndex={2}
            >
              <Button
                backgroundColor="primary.500"
                color="white"
                display="flex"
                justifyContent="space-between"
                variantColor="primary"
                width={{base: "100%", sm: "auto"}}
                onClick={openCart}
              >
                <Stack isInline alignItems="center" flex={1} spacing={4}>
                  <Badge
                    backgroundColor="primary.700"
                    color="primary.50"
                    fontSize="sm"
                    paddingX={2}
                    paddingY={1}
                    variantColor="primary"
                  >
                    {count}
                  </Badge>
                  <Text flex={1}>Revisar pedido</Text>
                  <Text>${total}</Text>
                </Stack>
              </Button>
            </Flex>
          )}
        </Stack>
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default ProductsScreen;
