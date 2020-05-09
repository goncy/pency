import React from "react";
import {
  Stack,
  Box,
  Icon,
  Avatar,
  PseudoBox,
  Flex,
  Text,
  Heading,
  Button,
  Badge,
  useDisclosure,
  Link,
  IconButton,
} from "@chakra-ui/core";

import ProductCard from "../components/ProductCard";
import {useFilteredProducts} from "../hooks";
import ProductsGrid from "../components/ProductsGrid";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartDrawer from "~/cart/components/CartDrawer";
import {filterBy} from "~/selectors/filter";
import {useTenant} from "~/tenant/hooks";

const ProductsScreen: React.FC = () => {
  const {add, remove, count, total} = useCart();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});
  const {banner, title, logo, phone, description} = useTenant();

  const productsByCategory = Object.entries(groupBy(products, (product) => product.category));
  const featuredProducts = filterBy(products, {featured: true});

  return (
    <>
      <Flex direction="column" height="100%">
        <Flex as="main" backgroundColor="primary.50" direction="column" flex={1} overflowY="auto">
          <Box
            backgroundColor="primary.500"
            backgroundImage={`url(${banner})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height={{base: 32, sm: 64}}
            minHeight={{base: 32, sm: 64}}
            width="100%"
          />
          <Box backgroundColor="white" margin="auto" maxWidth="1120px" width="100%">
            <Box margin="auto" marginBottom={4}>
              <Flex justifyContent="space-between" padding={4}>
                {logo ? (
                  <Box
                    backgroundColor="primary.500"
                    backgroundImage={`url(${logo})`}
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="contain"
                    border="4px solid white"
                    height={24}
                    marginTop={-12}
                    minHeight={24}
                    minWidth={24}
                    rounded="50%"
                    width={24}
                  />
                ) : (
                  <Avatar
                    border="4px solid white"
                    height={24}
                    marginTop={-12}
                    name={title}
                    src={logo}
                    width={24}
                  />
                )}
                <Stack isInline spacing={4}>
                  <Link isExternal href={`tel:${phone}`}>
                    <IconButton
                      aria-label="phone"
                      icon="phone"
                      rounded="50%"
                      variantColor="primary"
                    />
                  </Link>
                </Stack>
              </Flex>
              <Stack paddingX={4}>
                <Heading as="h1">{title}</Heading>
                <Text color="gray.500">{description}</Text>
              </Stack>
            </Box>
            <Box marginBottom={4} paddingX={4}>
              {filters}
            </Box>
            {Boolean(featuredProducts.length) && (
              <Box marginBottom={4} paddingX={4}>
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
                  <PseudoBox key={category} marginBottom={4} paddingX={4}>
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
                marginBottom={4}
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
                bottom={0}
                justifyContent="center"
                padding={4}
                paddingTop={0}
                position="sticky"
                zIndex={2}
              >
                <Flex
                  alignItems="center"
                  boxShadow="0 0 6px currentColor"
                  color="primary.500"
                  display="block"
                  justifyContent="center"
                  margin={{base: 0, sm: "auto"}}
                  rounded={4}
                  width={{base: "100%", sm: "auto"}}
                >
                  <Button
                    backgroundColor="primary.500"
                    color="white"
                    display="flex"
                    justifyContent="space-between"
                    variantColor="primary"
                    width="100%"
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
          </Box>
        </Flex>
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default ProductsScreen;
