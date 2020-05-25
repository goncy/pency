import React from "react";
import {Stack, Box, Icon, PseudoBox, Flex, Text, useDisclosure} from "@chakra-ui/core";

import ProductCard from "../components/ProductCard";
import {useFilteredProducts} from "../hooks";
import ProductsGrid from "../components/ProductsGrid";
import ProductsCarousel from "../components/ProductsCarousel";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartDrawer from "~/cart/components/CartDrawer";
import {filterBy} from "~/selectors/filter";
import {useTenant} from "~/tenant/hooks";
import {useTranslation} from "~/hooks/translation";
import CartTotalButton from "~/cart/components/CartTotalButton";
import TenantHeader from "~/tenant/components/TenantHeader";

const ProductsScreen: React.FC = () => {
  const {add, remove, count, total} = useCart();
  const {t} = useTranslation();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});
  const {highlight, ...tenant} = useTenant();

  const featuredProducts = filterBy(products, {featured: true});
  const productsByCategory = groupBy(products, (product) => product.category);

  return (
    <>
      <Flex direction="column" height="100%">
        <Flex
          as="main"
          backgroundColor="white"
          direction="column"
          flex={1}
          height="100%"
          overflowX="hidden"
          overflowY="auto"
        >
          <TenantHeader
            contentProps={{
              margin: "auto",
              maxWidth: {base: "100%", xl: "6xl"},
              paddingX: 4,
            }}
            data-test-id="header"
            marginBottom={4}
            tenant={tenant}
          />
          <Box flex={1}>
            {highlight && (
              <Box
                backgroundColor="primary.50"
                color="primary.500"
                fontWeight="500"
                marginTop={4}
                paddingX={4}
                paddingY={3}
                rounded={{sm: 0, xl: "lg"}}
                textAlign={{base: "left", xl: "center"}}
              >
                {highlight}
              </Box>
            )}
            <Box marginBottom={{base: 5, sm: 10}}>
              <Flex
                borderBottomWidth={1}
                borderColor="gray.200"
                borderTopWidth={1}
                data-test-id="filters"
              >
                <Flex
                  margin="auto"
                  maxWidth={{base: "100%", xl: "6xl"}}
                  paddingX={4}
                  paddingY={1}
                  width="100%"
                >
                  {filters}
                </Flex>
              </Flex>
            </Box>
            <Stack margin="auto" spacing={5} width="100%">
              {Boolean(products.length) ? (
                <Stack
                  margin="auto"
                  maxWidth={{base: "100%", xl: "6xl"}}
                  paddingX={4}
                  spacing={{base: 5, sm: 10}}
                  width="100%"
                >
                  {Boolean(featuredProducts.length) && (
                    <Stack spacing={{base: 4, sm: 5}}>
                      <Text fontSize={{base: "lg", sm: "2xl"}} fontWeight={500}>
                        {t("products.featured")}
                      </Text>
                      <ProductsCarousel zIndex={0}>
                        {featuredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            isRaised
                            add={add}
                            minWidth={{base: "60vw", sm: 280}}
                            product={product}
                            remove={remove}
                          />
                        ))}
                      </ProductsCarousel>
                    </Stack>
                  )}
                  {productsByCategory.map(([category, products]) => {
                    return (
                      <PseudoBox
                        key={category}
                        _last={{marginBottom: 4}}
                        as="section"
                        id={category}
                      >
                        <Stack spacing={{base: 4, sm: 5}}>
                          <Text
                            data-test-id="category-title"
                            fontSize={{base: "lg", sm: "2xl"}}
                            fontWeight={500}
                          >
                            {category}
                          </Text>
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
                        </Stack>
                      </PseudoBox>
                    );
                  })}
                </Stack>
              ) : (
                <Flex
                  alignItems="center"
                  data-test-id="empty"
                  direction="column"
                  flex={1}
                  justifyContent="center"
                  marginTop={12}
                  style={{marginBottom: 12}}
                >
                  <Icon
                    color="gray.200"
                    fontSize={{base: 64, sm: 96}}
                    marginBottom={4}
                    name="search"
                  />
                  <Text color="gray.300" fontSize={{base: "md", sm: "lg"}} textAlign="center">
                    {t("products.empty")}
                  </Text>
                </Flex>
              )}
              {Boolean(count) && (
                <Flex
                  as="nav"
                  bottom={0}
                  justifyContent="center"
                  margin={{base: 0, sm: "auto"}}
                  paddingBottom={4}
                  paddingX={4}
                  position="sticky"
                  zIndex={2}
                >
                  <CartTotalButton count={count} total={total} onClick={openCart} />
                </Flex>
              )}
            </Stack>
          </Box>
        </Flex>
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default ProductsScreen;
