import React from "react";
import {Stack, Box, Icon, Text, Flex, Heading} from "@chakra-ui/core";

import ProductDrawer from "../components/ProductDrawer";
import {useFilteredProducts, useProductActions} from "../hooks";
import {Product} from "../types";
import ProductRow from "../components/ProductRow";

import {groupBy} from "~/selectors/group";
import PlusIcon from "~/ui/icons/Plus";
import IconButton from "~/ui/controls/IconButton";

const AdminScreen: React.FC = () => {
  const [selected, setSelected] = React.useState<Partial<Product> | undefined>(undefined);
  const {products, filters} = useFilteredProducts();
  const {update, remove, create} = useProductActions();
  const productsByCategory = groupBy(products, (product) => product.category);

  async function handleSubmit(product: Product) {
    if (product.id) {
      await update(product);
    } else {
      await create(product);
    }

    closeDrawer();
  }

  function onCreate() {
    setSelected({
      available: true,
      image: "",
      options: [],
    });
  }

  function onEdit(product: Product) {
    setSelected(product);
  }

  function closeDrawer() {
    setSelected(undefined);
  }

  return (
    <>
      <Flex direction="column" height="100%">
        <Box flex={1}>
          <Flex alignItems="center" justifyContent="space-between">
            {filters}
            <IconButton
              data-test-id="add-product"
              leftIcon={PlusIcon}
              marginLeft={4}
              variantColor="primary"
              onClick={onCreate}
            >
              Agregar
            </IconButton>
          </Flex>
          {products.length ? (
            productsByCategory.map(([category, products]) => {
              const productsBySubcategory = groupBy(products, (product) => product.subcategory);

              return (
                <Box key={category} mt={4}>
                  <Flex direction="column">
                    <Heading as="h2" size="xl">
                      {category}
                    </Heading>
                    {productsBySubcategory.map(([subcategory, products]) => (
                      <Box key={`${category}-${subcategory}`} mt={4}>
                        <Flex direction="column">
                          {subcategory && (
                            <Heading as="h3" mb={4} size="lg">
                              {subcategory}
                            </Heading>
                          )}
                          <Stack spacing={4}>
                            {products.map((product) => (
                              <Box key={`${category}-${subcategory}-${product.id}`}>
                                <ProductRow onClick={onEdit} onRemove={remove} {...product} />
                              </Box>
                            ))}
                          </Stack>
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
      <ProductDrawer
        defaultValues={selected}
        isOpen={Boolean(selected)}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AdminScreen;
