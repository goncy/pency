import React from "react";
import {
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  Drawer,
  Button,
} from "@chakra-ui/core";

import {Product} from "../types";
import ProductForm from "../forms/ProductForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Product) => void;
  defaultValues?: Product;
}

const ProductDrawer: React.FC<Props> = ({isOpen, defaultValues, onClose, onSubmit}) => {
  return (
    <Drawer id="product" isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton right="8px" top="8px" />
        <DrawerHeader p={4}>{defaultValues ? "Editar" : "Agregar"} producto</DrawerHeader>
        <ProductForm defaultValues={defaultValues} onSubmit={onSubmit}>
          {({form, submit, isLoading}) => (
            <>
              <DrawerBody overflowY="auto" padding={4}>
                {form}
              </DrawerBody>
              <DrawerFooter padding={4}>
                <Button
                  backgroundColor="primary.500"
                  color="white"
                  isLoading={isLoading}
                  type="submit"
                  variantColor="primary"
                  w="100%"
                  onClick={(event) => {
                    event.stopPropagation();

                    submit();
                  }}
                >
                  {defaultValues ? "Guardar" : "Agregar"}
                </Button>
              </DrawerFooter>
            </>
          )}
        </ProductForm>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDrawer;
