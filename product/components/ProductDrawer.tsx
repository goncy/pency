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
  onSubmit: (values: Omit<Product, "id">) => void;
  defaultValues?: Partial<Product>;
}

const ProductDrawer: React.FC<Props> = ({isOpen, defaultValues, onClose, onSubmit}) => {
  const isNew = Boolean(!defaultValues?.id);

  return (
    <Drawer id="product" isOpen={isOpen} placement="right" size="md" onClose={onClose} closeOnOverlayClick={false}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton right="8px" top="8px" />
        <DrawerHeader padding={4}>{isNew ? "Agregar" : "Editar"} producto</DrawerHeader>
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
                  {isNew ? "Agregar" : "Guardar"}
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
