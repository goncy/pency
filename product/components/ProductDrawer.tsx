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
import {useProductActions} from "../hooks";
import ProductForm from "../forms/ProductForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProductDrawer: React.FC<Props> = ({isOpen, onClose}) => {
  const {create} = useProductActions();

  async function handleSubmit(values: Product) {
    await create(values);

    onClose();
  }

  return (
    <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton right="8px" top="8px" />
        <DrawerHeader p={4}>Agregar producto</DrawerHeader>
        <ProductForm onSubmit={handleSubmit}>
          {({form, submit, isLoading}) => (
            <>
              <DrawerBody overflowY="auto" p={4}>
                {form}
              </DrawerBody>
              <DrawerFooter padding={2}>
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
                  Agregar
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
