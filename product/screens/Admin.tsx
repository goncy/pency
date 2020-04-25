import React from "react";
import {
  Stack,
  IconButton,
  AspectRatioBox,
  Image,
  Box,
  Icon,
  Text,
  Flex,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/core";

import ProductDrawer from "../components/ProductDrawer";
import {useFilteredProducts, useProductActions} from "../hooks";
import {Product} from "../types";

import {groupBy} from "~/selectors/group";

const AdminScreen: React.FC = () => {
  const [selected, setSelected] = React.useState<Product | undefined>(undefined);
  const {isOpen: isDrawerOpen, onOpen, onClose} = useDisclosure();
  const {products, filters} = useFilteredProducts();
  const {update, remove, create} = useProductActions();
  const productsByCategory = Object.entries(groupBy(products, (product) => product.category));

  async function handleCreate(product: Product) {
    await create(product);

    closeDrawer();
  }

  async function handleUpdate(product: Product) {
    await update(product);

    closeDrawer();
  }

  function onCreate() {
    openDrawer();
  }

  function onEdit(product: Product) {
    setSelected(product);

    openDrawer();
  }

  function closeDrawer() {
    setSelected(undefined);

    onClose();
  }

  function openDrawer() {
    onOpen();
  }

  return (
    <>
      <Flex direction="column" height="100%">
        <Box flex={1}>
          {filters}
          <Button
            mt={4}
            variantColor="primary"
            width={{base: "100%", sm: "auto"}}
            onClick={onCreate}
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
                          <Stack spacing={4}>
                            {products.map((product) => (
                              <Flex
                                key={product.id}
                                alignItems="center"
                                borderWidth={1}
                                cursor="pointer"
                                padding={2}
                                rounded="lg"
                                onClick={() => onEdit(product)}
                              >
                                <AspectRatioBox maxWidth={16} ratio={1} width="100%">
                                  <Image
                                    backgroundColor="gray.100"
                                    borderWidth={1}
                                    rounded="lg"
                                    src={product.image}
                                  />
                                </AspectRatioBox>
                                <Text flex={1} fontSize="lg" marginX={4}>
                                  {product.title}
                                </Text>
                                <IconButton
                                  alignSelf="flex-end"
                                  aria-label="Borrar producto"
                                  icon="delete"
                                  margin="auto"
                                  variant="ghost"
                                  variantColor="red"
                                  onClick={(event) => {
                                    event.stopPropagation();

                                    remove(product.id);
                                  }}
                                />
                              </Flex>
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
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSubmit={selected ? handleUpdate : handleCreate}
      />
    </>
  );
};

export default AdminScreen;
