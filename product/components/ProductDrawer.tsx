import React from "react";
import {Button, Stack, IDrawer} from "@chakra-ui/core";

import {Product} from "../types";
import ProductForm from "../forms/ProductForm";

import Drawer, {DrawerHeader, DrawerBody, DrawerTitle} from "~/ui/controls/Drawer";

interface Props extends Omit<IDrawer, "children"> {
  onClose: () => void;
  categories: Product["category"][];
  onSubmit: (values: Omit<Product, "id">) => void;
  defaultValues?: Partial<Product>;
}

const ProductDrawer: React.FC<Props> = ({categories, defaultValues, onClose, onSubmit}) => {
  const isNew = Boolean(!defaultValues?.id);

  return (
    <Drawer closeOnOverlayClick={false} id="product" onClose={onClose}>
      <DrawerHeader onClose={onClose} />
      <ProductForm categories={categories} defaultValues={defaultValues} onSubmit={onSubmit}>
        {({form, submit, isLoading}) => (
          <DrawerBody marginBottom={4}>
            <Stack shouldWrapChildren spacing={4}>
              <DrawerTitle>{isNew ? "Agregar" : "Editar"} producto</DrawerTitle>
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
    </Drawer>
  );
};

export default ProductDrawer;
