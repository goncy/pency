import React from "react";
import {
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Text,
  Drawer,
  Button,
  Stack,
} from "@chakra-ui/core";

import {Product} from "../types";
import ProductForm from "../forms/ProductForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Product["category"][];
  onSubmit: (values: Omit<Product, "id">) => void;
  defaultValues?: Partial<Product>;
}

const ProductDrawer: React.FC<Props> = ({categories, isOpen, defaultValues, onClose, onSubmit}) => {
  const isNew = Boolean(!defaultValues?.id);

  return (
    <Drawer
      closeOnOverlayClick={false}
      id="product"
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton right="12px" top="12px" />
        <ProductForm categories={categories} defaultValues={defaultValues} onSubmit={onSubmit}>
          {({form, submit, isLoading}) => (
            <DrawerBody overflowY="auto" padding={0}>
              <Stack shouldWrapChildren marginX={{base: 4, sm: 12}} marginY={8} spacing={4}>
                <Text fontSize="2xl" fontWeight={500}>
                  {isNew ? "Agregar" : "Editar"} producto
                </Text>
                {form}
                <Button
                  backgroundColor="primary.500"
                  color="white"
                  data-test-id={isNew ? `submit-new-product` : `submit-edit-product`}
                  isLoading={isLoading}
                  type="submit"
                  variantColor="primary"
                  width="100%"
                  onClick={(event) => {
                    event.stopPropagation();

                    submit();
                  }}
                >
                  {isNew ? "Agregar producto" : "Editar producto"}
                </Button>
              </Stack>
            </DrawerBody>
          )}
        </ProductForm>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDrawer;
