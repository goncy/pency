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
  Link,
  IconButton,
  Grid,
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

const ProductsScreen: React.FC = () => {
  const {add, remove, count, total} = useCart();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});
  const {banner, title, logo, phone, description} = useTenant();

  const productsByCategory = groupBy(products, (product) => product.category);
  const featuredProducts = filterBy(products, {featured: true});

  return (
    <>
      <Flex direction="column" height="100%">
        <Flex
          as="main"
          backgroundColor="primary.50"
          direction="column"
          flex={1}
          height="100%"
          overflowX="hidden"
          overflowY="auto"
        >
          <Box
            backgroundColor="primary.500"
            backgroundImage={`url(${banner})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height={{base: 24, sm: 56}}
            minHeight={{base: 24, sm: 56}}
            width="100%"
          />
          <Box
            backgroundColor="white"
            flex={1}
            margin="auto"
            maxWidth={{base: "100%", xl: "80em"}}
            paddingX={{base: 4, xl: 12}}
            width="100%"
          >
            <Box margin="auto" marginBottom={4}>
              <Grid
                gridTemplateAreas={{
                  base: `"avatar links" "information information"`,
                  sm: `"avatar information links"`,
                }}
                gridTemplateColumns={{
                  base: `auto`,
                  sm: `auto 1fr auto`,
                }}
              >
                <TenantAvatar
                  gridArea="avatar"
                  logo={logo}
                  marginRight={{base: 0, sm: 4}}
                  marginTop={{base: -6, sm: -8}}
                  title={title}
                />
                <Stack gridArea="information" marginTop={{base: 0, sm: 4}}>
                  <Heading
                    as="h1"
                    fontSize={{base: "2xl", sm: "3xl"}}
                    fontWeight="bold"
                    style={{margin: 0}}
                  >
                    {title}
                  </Heading>
                  <Text color="gray.500">{description}</Text>
                </Stack>
                <Stack
                  isInline
                  gridArea="links"
                  justifyContent="flex-end"
                  marginTop={4}
                  spacing={4}
                >
                  <Link isExternal href={`whatsapp://send?phone=${phone}`}>
                    <IconButton
                      aria-label="Enviar mensaje por WhatsApp"
                      icon="phone"
                      rounded="50%"
                      variantColor="primary"
                    />
                  </Link>
                </Stack>
              </Grid>
            </Box>
            <Box marginBottom={4}>{filters}</Box>
            {Boolean(featuredProducts.length) && (
              <Box marginBottom={12}>
                <Heading as="h2" fontSize={{base: "2xl", sm: "3xl"}} marginBottom={4}>
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
                const productsBySubcategory = groupBy(products, (product) => product.subcategory);

                return (
                  <PseudoBox key={category} marginBottom={12}>
                    <Flex direction="column">
                      <Heading as="h2" fontSize={{base: "2xl", sm: "3xl"}}>
                        {category}
                      </Heading>
                      {productsBySubcategory.map(([subcategory, products]) => (
                        <PseudoBox key={subcategory} marginTop={4}>
                          <Flex direction="column">
                            {subcategory && (
                              <Heading
                                as="h3"
                                fontSize={{base: "xl", sm: "2xl"}}
                                fontWeight={500}
                                marginBottom={4}
                              >
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
                marginTop={16}
              >
                <Icon
                  color="gray.200"
                  fontSize={{base: 64, sm: 96}}
                  marginBottom={4}
                  name="search"
                />
                <Text color="gray.300" fontSize={{base: "md", sm: "lg"}} textAlign="center">
                  No se encontraron productos
                </Text>
              </Flex>
            )}
            {Boolean(count) && (
              <Flex
                bottom={0}
                justifyContent="center"
                paddingBottom={4}
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
