import React from "react";
import {Button, Stack} from "@chakra-ui/core";
import isEqual from "lodash.isequal";

import {Product} from "../../types";

import Drawer, {DrawerHeader, DrawerBody, DrawerTitle, DrawerFooter} from "~/ui/controls/Drawer";
import {useToast} from "~/hooks/toast";
import ProductsForm from "~/product/forms/ProductsForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Product[]) => Promise<void>;
  defaultValues?: Product[];
}

const ProductsUpsertDrawer: React.FC<Props> = ({isOpen, onClose, defaultValues = [], onSubmit}) => {
  const [isLoading, toggleLoading] = React.useState(false);
  const toast = useToast();

  async function handleSubmit(products: Product[]) {
    // Toggle spinner
    toggleLoading(true);

    // Store and merge changes
    const changed = products.reduce<Product[]>((products, changedProduct) => {
      // If its a new product
      if (!changedProduct.id) {
        // Add it to the list
        return products.concat(changedProduct);
      }

      // Find base product
      const baseProduct = defaultValues.find((_product) => _product.id === changedProduct.id);

      // If we have a base product
      if (baseProduct) {
        // Check if changed
        const changed = !isEqual(baseProduct, changedProduct);

        // If it changed
        return changed
          ? // Merge it with base product and concat to products
            products.concat({...baseProduct, ...changedProduct})
          : // Otherwise return untoched
            products;
      } else {
        // Otherwise add the untouched product
        return products.concat(changedProduct);
      }
    }, []);

    if (!changed.length) {
      toast({
        status: "warning",
        title: "Sin cambios",
        description: "No se encontraron cambios de productos en esta planilla",
      });
    }

    // Submit products
    await onSubmit(changed);

    // Remove spinner
    toggleLoading(false);
  }

  return (
    <Drawer closeOnOverlayClick={false} id="bulk-products" isOpen={isOpen} onClose={onClose}>
      <DrawerHeader onClose={onClose} />
      <ProductsForm defaultValues={defaultValues} onSubmit={handleSubmit}>
        {({form, submit}) => (
          <>
            <DrawerBody marginBottom={4}>
              <Stack shouldWrapChildren spacing={4}>
                <DrawerTitle>Herramienta de importación / edición en lote</DrawerTitle>
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

export default ProductsUpsertDrawer;
