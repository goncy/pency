import React from "react";
import {Button, Stack} from "@chakra-ui/core";

import {Product} from "../../types";
import ProductsForm from "../../forms/ProductsForm";

import Drawer, {DrawerHeader, DrawerBody, DrawerTitle, DrawerFooter} from "~/ui/controls/Drawer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Product[]) => void;
  defaultValues?: Product[];
}

const ProductsBulkEditDrawer: React.FC<Props> = ({isOpen, defaultValues, onClose, onSubmit}) => {
  return (
    <Drawer
      closeOnOverlayClick={false}
      id="bulk-products"
      isOpen={isOpen}
      size="full"
      onClose={onClose}
    >
      <DrawerHeader onClose={onClose} />
      <ProductsForm defaultValues={defaultValues} onSubmit={onSubmit}>
        {({form, submit, isLoading}) => (
          <>
            <DrawerBody marginBottom={4}>
              <Stack shouldWrapChildren spacing={4}>
                <DrawerTitle>Editar productos</DrawerTitle>
                {form}
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                backgroundColor="primary.500"
                color="white"
                data-test-id="submit-bulk-products"
                isLoading={isLoading}
                type="submit"
                variantColor="primary"
                width="100%"
                onClick={(event) => {
                  event.stopPropagation();

                  submit();
                }}
              >
                Guardar productos
              </Button>
            </DrawerFooter>
          </>
        )}
      </ProductsForm>
    </Drawer>
  );
};

export default ProductsBulkEditDrawer;
