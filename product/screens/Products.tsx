import React from "react";
import {Stack, Box, PseudoBox, Flex, useDisclosure} from "@chakra-ui/core";

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
import TenantHeader from "~/tenant/components/TenantHeader";
import NoResults from "~/ui/feedback/NoResults";
import Content from "~/ui/structure/Content";
import SummaryButton from "~/cart/components/SummaryButton";

const ProductsScreen: React.FC = () => {
  const {add, remove, items, checkout} = useCart();
  const t = useTranslation();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});
  const {highlight, fields, ...tenant} = useTenant();

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
          <TenantHeader data-test-id="header" marginBottom={4} tenant={tenant} />
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
                <Content paddingX={4} paddingY={1}>
                  {filters}
                </Content>
              </Flex>
            </Box>
            <Content paddingX={4}>
              <Stack margin="auto" spacing={5} width="100%">
                {Boolean(products.length) ? (
                  <Stack spacing={{base: 5, sm: 10}} width="100%">
                    {Boolean(featuredProducts.length) && (
                      <ProductsCarousel title={t("common.featured")} zIndex={0}>
                        {featuredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            isRaised
                            add={add}
                            minWidth={280}
                            product={product}
                            remove={remove}
                          />
                        ))}
                      </ProductsCarousel>
                    )}
                    {productsByCategory.map(([category, products]) => {
                      return (
                        <PseudoBox
                          key={category}
                          _last={{marginBottom: 4}}
                          as="section"
                          id={category}
                        >
                          <ProductsGrid data-test-id="category" title={category}>
                            {products.map((product) => (
                              <ProductCard
                                key={product.id}
                                add={add}
                                product={product}
                                remove={remove}
                              />
                            ))}
                          </ProductsGrid>
                        </PseudoBox>
                      );
                    })}
                  </Stack>
                ) : (
                  <NoResults data-test-id="empty">{t("products.empty")}</NoResults>
                )}
                {Boolean(items.length) && (
                  <Flex
                    as="nav"
                    bottom={0}
                    justifyContent="center"
                    margin={{base: 0, sm: "auto"}}
                    paddingBottom={4}
                    position="sticky"
                    zIndex={2}
                  >
                    <Box
                      display="block"
                      margin={{base: 0, sm: "auto"}}
                      minWidth={{base: "100%", sm: 64}}
                      rounded={4}
                      width={{base: "100%", sm: "auto"}}
                    >
                      <SummaryButton items={items} onClick={openCart}>
                        {t("products.review")}
                      </SummaryButton>
                    </Box>
                  </Flex>
                )}
              </Stack>
            </Content>
          </Box>
        </Flex>
      </Flex>
      <CartDrawer
        fields={fields}
        isOpen={isCartOpen}
        items={items}
        onCheckout={checkout}
        onClose={closeCart}
        onRemove={remove}
      />
    </>
  );
};

export default ProductsScreen;
