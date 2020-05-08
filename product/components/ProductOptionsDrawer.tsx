import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/core";

import ProductOptionsForm from "../forms/ProductOptionsForm";
import {Option} from "../types";

interface Props {
  isOpen: boolean;
  options: Option[];
  onClose: () => void;
  onSubmit: (values: Option[]) => void;
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
        </ProductOptionsForm>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductOptionsDrawer;
