import React from "react";
import {
  Stack,
  Box,
  Icon,
  IconButton,
  PseudoBox,
  Link,
  Flex,
  Text,
  Heading,
  Divider,
  useDisclosure,
} from "@chakra-ui/core";

import ProductCard from "../components/ProductCard";
import {useFilteredProducts} from "../hooks";
import ProductsGrid from "../components/ProductsGrid";
import ProductCheckoutButton from "../components/ProductCheckoutButton";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartDrawer from "~/cart/components/CartDrawer";
import {filterBy} from "~/selectors/filter";
import {useTenant} from "~/tenant/hooks";
import TenantAvatar from "~/tenant/components/TenantAvatar";
import Empty from "~/ui/feedback/Empty";

const ProductsScreen: React.FC = () => {
  const {add, remove, count, total} = useCart();
  const {banner, description, title, logo, phone} = useTenant();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, open: openFilters, filters, hasFilters} = useFilteredProducts({available: true});

  const productsByCategory = Object.entries(groupBy(products, (product) => product.category));
  const featuredProducts = filterBy(products, {featured: true});

  return (
    <>
      <Flex as="main" direction="column" flex={1} height="100%" overflowY="auto">
        <Box
          backgroundColor="primary.500"
          backgroundImage={`url(${banner})`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          height={32}
          minHeight={32}
          width="100%"
        />
        <Flex justifyContent="space-between" padding={4}>
          <TenantAvatar logo={logo} title={title} />
          <Stack isInline spacing={4}>
            <Link isExternal href={`tel:${phone}`}>
              <IconButton aria-label="phone" icon="phone" rounded="50%" variantColor="primary" />
            </Link>
          </Stack>
        </Flex>
        <Stack paddingX={4}>
          <Heading as="h1">{title}</Heading>
          <Text color="gray.500">{description}</Text>
        </Stack>
        <Divider borderColor="gray.300" marginBottom={0} marginTop={4} />
        <Stack spacing={4}>
          <Flex
            alignItems="center"
            backgroundColor="rgba(255,255,255,0.8)"
            boxShadow="sm"
            justifyContent="flex-end"
            padding={4}
            position="sticky"
            style={{marginBottom: -48}}
            top={0}
            zIndex={2}
          >
            <Box lineHeight="normal" position="relative">
              {hasFilters && (
                <Box
                  backgroundColor="primary.500"
                  border="2px solid white"
                  borderRadius="50%"
                  height={3}
                  position="absolute"
                  right={-1}
                  top={-1}
                  width={3}
                />
              )}
              <Icon cursor="pointer" name="search" onClick={openFilters} />
            </Box>
          </Flex>
          {Boolean(featuredProducts.length) && (
            <Box paddingX={4}>
              <Heading
                as="h4"
                fontWeight={600}
                marginBottom={4}
                paddingY={3}
                position="sticky"
                size="md"
                top={0}
                width="calc(100% - 48px)"
                zIndex={3}
              >
                Destacados
              </Heading>
              <ProductsGrid>
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAdd={add} onRemove={remove} />
                ))}
              </ProductsGrid>
            </Box>
          )}
          {Boolean(products.length) ? (
            productsByCategory.map(([category, products]) => {
              const productsBySubcategory = Object.entries(
                groupBy(products, (product) => product.subcategory),
              ).sort(([subcategory]) => (!subcategory ? -1 : 0));

              return (
                <PseudoBox key={category} paddingX={4}>
                  <Flex direction="column">
                    <Heading
                      as="h4"
                      fontWeight={600}
                      paddingY={3}
                      position="sticky"
                      size="md"
                      top={0}
                      width="calc(100% - 48px)"
                      zIndex={3}
                    >
                      {category}
                    </Heading>
                    {productsBySubcategory.map(([subcategory, products]) => (
                      <PseudoBox key={subcategory} marginTop={4}>
                        <Flex direction="column">
                          {subcategory && (
                            <Heading as="h3" fontSize="md" fontWeight={600} mb={4}>
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
            <Empty data-test-id="empty" icon="search" paddingX={4}>
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
              padding={4}
              paddingTop={0}
              position="sticky"
              zIndex={3}
            >
              <ProductCheckoutButton count={count} total={total} zIndex={3} onClick={openCart}>
                Revisar pedido
              </ProductCheckoutButton>
            </Flex>
          )}
        </Stack>
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {filters}
    </>
  );
};

export default ProductsScreen;
