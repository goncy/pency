import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/core";

import ProductOptionsForm from "../forms/ProductOptionsForm";
import {Variant} from "../types";

import Button from "~/ui/controls/Button";

interface Props {
  isOpen: boolean;
  options: Variant[];
  onClose: () => void;
  onSubmit: (values: Variant[]) => void;
}

const ProductOptionsDrawer: React.FC<Props> = ({isOpen, onClose, onSubmit, options}) => {
  return (
    <Drawer id="options" isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton right="8px" top="8px" />
        <DrawerHeader p={4}>Opciones</DrawerHeader>
        <ProductOptionsForm options={options} onSubmit={onSubmit}>
          {({form, submit, isLoading}) => (
            <>
              <DrawerBody overflowY="auto" padding={4}>
                {form}
              </DrawerBody>
              <DrawerFooter padding={4}>
                <Button
                  boxShadow="lg"
                  isLoading={isLoading}
                  size="lg"
                  type="submit"
                  variantColor="primary"
                  width="100%"
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
        </ProductOptionsForm>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductOptionsDrawer;
