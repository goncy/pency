import React from "react";
import fetch from "isomorphic-unfetch";
import {
  Grid,
  Box,
  Icon,
  PseudoBox,
  Flex,
  Text,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/core";

import ProductCard from "../components/ProductCard";
import {useFilteredProducts} from "../hooks";

import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartDrawer from "~/cart/components/CartDrawer";

const ProductsScreen: React.FC = () => {
  const {add, remove, cart, count, total} = useCart();
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts({available: true});

  const productsByCategory = Object.entries(groupBy(products, (product) => product.category));

  return (
    <>
      <Flex direction="column" height="100%" overflowY="hidden">
        <Box flex={1} overflowY="auto" padding={{base: 3, sm: 6}}>
          {filters}
          {products.length ? (
            productsByCategory.map(([category, products]) => {
              const productsBySubcategory = Object.entries(
                groupBy(products, (product) => product.subcategory),
              );

              return (
                <PseudoBox key={category} mt={{base: 3, sm: 6}}>
                  <Flex direction="column">
                    <Heading as="h2" size="xl" textTransform="capitalize">
                      {category}
                    </Heading>
                    {productsBySubcategory.map(([subcategory, products]) => (
                      <PseudoBox key={subcategory} mt={{base: 3, sm: 6}}>
                        <Flex direction="column">
                          {subcategory && (
                            <Heading
                              as="h3"
                              mb={{base: 3, sm: 6}}
                              size="lg"
                              textTransform="capitalize"
                            >
                              {subcategory}
                            </Heading>
                          )}
                          <Grid
                            autoRows="auto"
                            gridGap={{base: 3, sm: 6}}
                            templateColumns={{
                              base: "auto",
                              sm: "repeat(auto-fill, minmax(auto, 340px))",
                            }}
                          >
                            {products.map((product) => (
                              <ProductCard
                                key={product.id}
                                add={add}
                                count={cart[product.id]?.count}
                                product={product}
                                remove={() => remove(product.id)}
                              />
                            ))}
                          </Grid>
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
              direction="column"
              flex={1}
              justifyContent="center"
              mt={{base: 12, sm: 24}}
              px={{base: 3, sm: 6}}
            >
              <Icon color="gray.200" mb={{base: 3, sm: 6}} name="search" size="128px" />
              <Text color="gray.500" fontSize="lg" textAlign="center">
                No se encontraron productos
              </Text>
            </Flex>
          )}
        </Box>
        {Boolean(count) && (
          <Flex
            alignItems="center"
            borderTopWidth="1px"
            display={["block", "flex"]}
            justifyContent="center"
            padding={2}
          >
            <Button
              backgroundColor="primary.500"
              color="white"
              variantColor="primary"
              w={{base: "100%", sm: "auto"}}
              onClick={openCart}
            >
              Revisar pedido (${total})
            </Button>
          </Flex>
        )}
      </Flex>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export async function getServerSideProps({params: {slug}}) {
  const tenant = await fetch(`http://localhost:3000/api/tenant?slug=${slug}`).then((res) =>
    res.json(),
  );
  const products = await fetch(
    `http://localhost:3000/api/product?tenant=${tenant.id}`,
  ).then((res) => res.json());

  return {props: {tenant, products}};
}

export default ProductsScreen;
