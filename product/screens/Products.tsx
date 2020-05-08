import React from "react";
import {Box, IconButton, PseudoBox, Flex, Heading, Divider, useDisclosure} from "@chakra-ui/core";

import ProductCard from "../components/ProductCard";
import {useFilteredProducts} from "../hooks";
import ProductsGrid from "../components/ProductsGrid";
import ProductCheckoutButton from "../components/ProductCheckoutButton";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartDrawer from "~/cart/components/CartDrawer";
import {filterBy} from "~/selectors/filter";
import Empty from "~/ui/feedback/Empty";
import TenantHeader from "~/tenant/components/TenantHeader";

const ProductsScreen: React.FC = () => {
  const {add, remove, count, total} = useCart();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, open: openFilters, filters, hasFilters} = useFilteredProducts({available: true});

  const productsByCategory = Object.entries(groupBy(products, (product) => product.category));
  const featuredProducts = filterBy(products, {featured: true});

  return (
    <>
      <Box as="main" backgroundColor="primary.50" height="100%">
        <Flex
          backgroundColor="white"
          direction="column"
          flex={1}
          height="100%"
          marginX="auto"
          maxWidth={1120}
          overflowY="auto"
        >
          <TenantHeader />
          <Divider borderColor="gray.300" marginBottom={0} marginTop={4} />
          <Flex direction="column">
            <Flex
              alignItems="center"
              backgroundColor="white"
              boxShadow="sm"
              height={16}
              justifyContent="flex-end"
              marginBottom={{base: -16, sm: 6}}
              position="sticky"
              top={0}
              zIndex={2}
            >
              <IconButton
                aria-label="Buscar productos"
                cursor="pointer"
                fontSize="2xl"
                height={16}
                icon="search"
                marginRight={2}
                variant="ghost"
                variantColor={hasFilters ? "primary" : "gray"}
                width={16}
                onClick={openFilters}
              />
            </Flex>
            {Boolean(featuredProducts.length) && (
              <Box marginBottom={4} paddingX={4}>
                <Heading
                  as="h4"
                  fontSize="3xl"
                  fontWeight={600}
                  lineHeight="64px"
                  position="sticky"
                  top={0}
                  width="calc(100% - 72px)"
                  zIndex={3}
                >
                  Destacados
                </Heading>
                <Box marginTop={4}>
                  <ProductsGrid>
                    {featuredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={add}
                        onRemove={remove}
                      />
                    ))}
                  </ProductsGrid>
                </Box>
              </Box>
            )}
            {Boolean(products.length) ? (
              productsByCategory.map(([category, products]) => {
                const productsBySubcategory = Object.entries(
                  groupBy(products, (product) => product.subcategory),
                ).sort(([subcategory]) => (!subcategory ? -1 : 0));

                return (
                  <PseudoBox key={category} marginBottom={4} paddingX={4}>
                    <Flex direction="column">
                      <Heading
                        as="h4"
                        fontSize="3xl"
                        fontWeight={600}
                        lineHeight="64px"
                        marginBottom={4}
                        position="sticky"
                        top={0}
                        width="calc(100% - 64px)"
                        zIndex={3}
                      >
                        {category}
                      </Heading>
                      {productsBySubcategory.map(([subcategory, products]) => (
                        <PseudoBox key={subcategory}>
                          <Flex direction="column">
                            {subcategory && (
                              <Heading
                                as="h3"
                                fontSize="2xl"
                                fontWeight={600}
                                lineHeight="64px"
                                my={2}
                              >
                                {subcategory}
                              </Heading>
                            )}
                            <ProductsGrid>
                              {products.map((product) => (
                                <ProductCard
                                  key={product.id}
                                  product={product}
                                  onAdd={add}
                                  onRemove={remove}
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
              <Empty data-test-id="empty" icon="search" marginBottom={4} paddingX={4}>
                No se encontraron productos
              </Empty>
            )}
            {Boolean(count) && (
              <Flex
                alignItems="center"
                bottom={0}
                display="block"
                justifyContent="center"
                margin={{base: 0, sm: "auto"}}
                paddingBottom={4}
                paddingX={4}
                position="sticky"
                zIndex={3}
              >
                <ProductCheckoutButton count={count} total={total} zIndex={3} onClick={openCart}>
                  Revisar pedido
                </ProductCheckoutButton>
              </Flex>
            )}
          </Flex>
        </Flex>
        <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
        {filters}
      </Box>
    </>
  );
};

export default ProductsScreen;
