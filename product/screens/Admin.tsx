import React from "react";
import {Grid, Box, Icon, Text, Flex, Heading, Button, useDisclosure} from "@chakra-ui/core";

import ProductEdit from "../components/ProductEdit";
import ProductDrawer from "../components/ProductDrawer";
import {useFilteredProducts, useProductActions} from "../hooks";

import {groupBy} from "~/selectors/group";

const AdminScreen: React.FC = () => {
  const {isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer} = useDisclosure();
  const {products, filters} = useFilteredProducts();
  const {update, remove} = useProductActions();
  const productsByCategory = Object.entries(groupBy(products, (product) => product.category));

  return (
    <>
      <Flex direction="column" height="100%">
        <Box flex={1}>
          {filters}
          <Button
            mt={4}
            variantColor="primary"
            width={{base: "100%", sm: "auto"}}
            onClick={openDrawer}
          >
            Agregar producto
          </Button>
          {products.length ? (
            productsByCategory.map(([category, products]) => {
              const productsBySubcategory = Object.entries(
                groupBy(products, (product) => product.subcategory),
              );

              return (
                <Box key={category} mt={4}>
                  <Flex direction="column">
                    <Heading as="h2" size="xl" textTransform="capitalize">
                      {category}
                    </Heading>
                    {productsBySubcategory.map(([subcategory, products]) => (
                      <Box key={subcategory} mt={4}>
                        <Flex direction="column">
                          {subcategory && (
                            <Heading as="h3" mb={4} size="lg" textTransform="capitalize">
                              {subcategory}
                            </Heading>
                          )}
                          <Grid
                            autoRows="auto"
                            gridGap={4}
                            templateColumns={{
                              base: "auto",
                              sm: "repeat(auto-fill, minmax(auto, 480px))",
                            }}
                          >
                            {products.map((product) => (
                              <Box key={product.id} borderWidth="1px" p={4}>
                                <ProductEdit
                                  product={product}
                                  remove={() => remove(product.id)}
                                  update={update}
                                />
                              </Box>
                            ))}
                          </Grid>
                        </Flex>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              );
            })
          ) : (
            <Flex
              alignItems="center"
              direction="column"
              flex={1}
              justifyContent="center"
              mt={{base: 12, sm: 24}}
              px={4}
            >
              <Icon color="gray.200" mb={4} name="search" size="128px" />
              <Text color="gray.500" fontSize="lg" textAlign="center">
                No se encontraron productos
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
      <ProductDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default AdminScreen;
