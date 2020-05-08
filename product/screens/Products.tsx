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
  Button,
  Divider,
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
import {useTenant} from "~/tenant/hooks";
import TenantAvatar from "~/tenant/components/TenantAvatar";
import Empty from "~/ui/feedback/Empty";

const ProductsScreen: React.FC = () => {
  const {add, remove, count, total} = useCart();
  const {banner, description, title, logo, phone} = useTenant();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});

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
        <Flex
          alignItems="center"
          backgroundColor="rgba(255,255,255,0.8)"
          boxShadow="md"
          justifyContent="flex-end"
          marginBottom={-12}
          padding={4}
          position="sticky"
          top={0}
          zIndex={1}
        >
          <Icon name="search" />
        </Flex>
        {/* <Box padding={4}>{filters}</Box> */}
        {Boolean(featuredProducts.length) && (
          <Box marginTop={1} paddingX={4}>
            <Heading
              as="h4"
              fontWeight={600}
              marginBottom={2}
              paddingY={2}
              position="sticky"
              size="md"
              top={1}
              zIndex={2}
            >
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
              <PseudoBox key={category} marginBottom={4} marginTop={1} paddingX={4}>
                <Flex direction="column">
                  <Heading
                    as="h4"
                    fontWeight={600}
                    marginBottom={2}
                    paddingY={2}
                    position="sticky"
                    size="md"
                    top={1}
                    zIndex={2}
                  >
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
            zIndex={2}
          >
            <Flex
              alignItems="center"
              bottom={0}
              boxShadow="0 0 6px currentColor"
              color="primary.500"
              display="block"
              justifyContent="center"
              rounded={4}
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
          </Flex>
        )}
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default ProductsScreen;
