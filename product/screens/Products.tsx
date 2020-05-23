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
  Grid,
} from "@chakra-ui/core";

import ProductCard from "../components/ProductCard";
import {useFilteredProducts} from "../hooks";
import ProductsGrid from "../components/ProductsGrid";
import ProductsCarousel from "../components/ProductsCarousel";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartDrawer from "~/cart/components/CartDrawer";
import {filterBy} from "~/selectors/filter";
import {useTenant} from "~/tenant/hooks";
import TenantAvatar from "~/tenant/components/TenantAvatar";
import SocialLinks from "~/ui/list/SocialLinks";

const ProductsScreen: React.FC = () => {
  const {add, remove, count, total} = useCart();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});
  const {
    highlight,
    facebook,
    instagram,
    twitter,
    banner,
    title,
    logo,
    phone,
    description,
  } = useTenant();

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
          <Box flex={1}>
            <Box
              data-test-id="header"
              margin="auto"
              marginBottom={4}
              maxWidth={{base: "100%", xl: "6xl"}}
              paddingX={4}
              width="100%"
            >
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
                <Stack gridArea="information" marginTop={{base: 1, sm: 4}}>
                  <Heading
                    as="h1"
                    fontSize={{base: "xl", sm: "3xl"}}
                    fontWeight="bold"
                    style={{margin: 0}}
                  >
                    {title}
                  </Heading>
                  <Text color="gray.500" fontSize={{base: "sm", sm: "md"}} lineHeight="normal">
                    {description}
                  </Text>
                </Stack>
                <SocialLinks
                  facebook={facebook}
                  gridArea="links"
                  instagram={instagram}
                  justifyContent="flex-end"
                  marginTop={4}
                  twitter={twitter}
                  whatsapp={phone}
                />
              </Grid>
            </Box>
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
            <Box marginBottom={4}>
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
            <Stack
              margin="auto"
              maxWidth={{base: "100%", xl: "6xl"}}
              paddingX={4}
              spacing={4}
              width="100%"
            >
              {Boolean(products.length) ? (
                <Stack spacing={12}>
                  {Boolean(featuredProducts.length) && (
                    <Stack spacing={2}>
                      <Heading as="h2" fontSize={{base: "lg", sm: "2xl"}} fontWeight={500}>
                        Destacados
                      </Heading>
                      <ProductsCarousel zIndex={0}>
                        {featuredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            isRaised
                            add={add}
                            maxWidth={{base: "60vw", sm: 280}}
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
                        <Stack spacing={2}>
                          <Heading
                            as="h2"
                            fontSize={{base: "lg", sm: "2xl"}}
                            fontWeight={500}
                            marginBottom={2}
                          >
                            {category}
                          </Heading>
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
                    No se encontraron productos
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
                      paddingLeft={2}
                      paddingRight={3}
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
            </Stack>
          </Box>
        </Flex>
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default ProductsScreen;
