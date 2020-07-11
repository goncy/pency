import React from "react";
import {Stack, Box, PseudoBox, Flex, useDisclosure} from "@chakra-ui/core";
import {useRouter} from "next/router";

import ProductCard from "../../components/ProductCard";
import {useFilteredProducts} from "../../hooks";
import ProductsGrid from "../../components/ProductsGrid";
import ProductsCarousel from "../../components/ProductsCarousel";

import Onboarding from "./Onboarding";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartSummaryDrawer from "~/cart/components/CartSummaryDrawer";
import {filterBy} from "~/selectors/filter";
import {useTenant} from "~/tenant/hooks";
import {useTranslation} from "~/i18n/hooks";
import TenantHeader from "~/tenant/components/TenantHeader";
import NoResults from "~/ui/feedback/NoResults";
import Content from "~/ui/structure/Content";
import SummaryButton from "~/cart/components/SummaryButton";
import CartItemDrawer from "~/cart/components/CartItemDrawer";
import {Product, Variant} from "~/product/types";
import {useAnalytics} from "~/analytics/hooks";

const ProductsScreen: React.FC = () => {
  const {
    query: {product},
    push,
  } = useRouter();
  const log = useAnalytics();
  const {add, increase, decrease, items, checkout} = useCart();
  const t = useTranslation();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts((product) => product.visibility !== "hidden");
  const {highlight, fields, layout, ...tenant} = useTenant();
  const selected = React.useMemo(() => products.find((_product) => _product.id === product), [
    products,
    product,
  ]);

  const featuredProducts = filterBy(products, {featured: true});
  const productsByCategory = groupBy(products, (product) => product.category);

  function handleAdd(product: Product, options: Variant[], count: number, note: string) {
    add(product, options, count, note);

    push(`/[slug]`, `/${tenant.slug}`, {shallow: true});
  }

  function handleOpenCart() {
    openCart();

    log.viewCart(items);
  }

  function handleCloseSelected() {
    push(`/[slug]`, `/${tenant.slug}`, {shallow: true});
  }

  function handleSelect(product: Product) {
    push(
      {
        pathname: `/[slug]`,
        query: {
          product: product.id,
        },
      },
      {
        pathname: `/${tenant.slug}`,
        query: {
          product: product.id,
        },
      },
      {shallow: true},
    );
  }

  return (
    <>
      <Flex direction="column" height="100%">
        <Flex as="main" backgroundColor="white" direction="column" flex={1} height="100%">
          <Content height="100%" paddingX={{base: 0, sm: 4}}>
            <TenantHeader data-test-id="header" marginBottom={4} tenant={tenant} />
            <Box flex={1}>
              {highlight && (
                <Box
                  backgroundColor="primary.50"
                  color="primary.500"
                  fontSize={{base: "sm", sm: "md"}}
                  fontWeight="500"
                  marginTop={4}
                  paddingX={4}
                  paddingY={3}
                  roundedTop={{base: 0, sm: "lg"}}
                  textAlign={{base: "left", sm: "center"}}
                >
                  {highlight}
                </Box>
              )}
              <Box marginBottom={{base: 5, sm: 10}}>
                <Flex
                  backgroundColor="gray.50"
                  data-test-id="filters"
                  roundedBottom="lg"
                  roundedTop={highlight ? "none" : "lg"}
                >
                  <Box paddingX={4} paddingY={1}>
                    {filters}
                  </Box>
                </Flex>
              </Box>
              <Box marginBottom={4} paddingX={{base: 4, sm: 0}}>
                <Stack margin="auto" spacing={5} width="100%">
                  {Boolean(products.length) ? (
                    <Stack spacing={{base: 5, sm: 10}} width="100%">
                      {Boolean(featuredProducts.length) && (
                        <ProductsCarousel title={t("common.featured")} zIndex={0}>
                          {featuredProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              isRaised
                              layout="portrait"
                              minWidth={280}
                              product={product}
                              onClick={() => handleSelect(product)}
                            />
                          ))}
                        </ProductsCarousel>
                      )}
                      {productsByCategory.map(([category, products]) => {
                        return (
                          <PseudoBox key={category} as="section" id={category}>
                            <ProductsGrid data-test-id="category" layout={layout} title={category}>
                              {products.map((product) => (
                                <ProductCard
                                  key={product.id}
                                  layout={layout}
                                  product={product}
                                  onClick={() => handleSelect(product)}
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
                </Stack>
              </Box>
            </Box>
          </Content>
        </Flex>
      </Flex>
      {Boolean(items.length) && (
        <Flex
          as="nav"
          bottom={0}
          justifyContent="center"
          margin={{base: 0, sm: "auto"}}
          paddingBottom={4}
          paddingX={4}
          position="sticky"
          width="100%"
          zIndex={2}
        >
          <Box
            display="block"
            margin={{base: 0, sm: "auto"}}
            minWidth={{base: "100%", sm: 64}}
            rounded={4}
            width={{base: "100%", sm: "auto"}}
          >
            <SummaryButton items={items} onClick={handleOpenCart}>
              {t("products.review")}
            </SummaryButton>
          </Box>
        </Flex>
      )}
      {isCartOpen && (
        <CartSummaryDrawer
          fields={fields}
          items={items}
          onCheckout={checkout}
          onClose={closeCart}
          onDecrease={decrease}
          onIncrease={increase}
        />
      )}
      {Boolean(selected) && (
        <CartItemDrawer product={selected} onClose={handleCloseSelected} onSubmit={handleAdd} />
      )}
      <Onboarding />
    </>
  );
};

export default ProductsScreen;
