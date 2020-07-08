import React from "react";
import {Button, Stack, Box} from "@chakra-ui/core";
import styled from "@emotion/styled";
import {flatten} from "flat";
import isEqual from "lodash.isequal";

import {Product} from "../../types";

import Drawer, {DrawerHeader, DrawerBody, DrawerTitle, DrawerFooter} from "~/ui/controls/Drawer";
import ProductsCSVInput from "~/product/inputs/ProductsCSVInput";
import {useToast} from "~/hooks/toast";
import {download} from "~/utils/download";
import {toCSV} from "~/utils/csv";
import schemas from "~/product/schemas";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Product[]) => Promise<void>;
  defaultValues?: Product[];
}

const Table = styled(Box)`
  border-collapse: collapse;
  border: 1px solid gainsboro;
  text-align: left;

  td,
  th {
    border: 1px solid gainsboro;
    padding: 8px;
  }
`;

const ProductsUpsertDrawer: React.FC<Props> = ({isOpen, onClose, defaultValues = [], onSubmit}) => {
  const [isLoading, toggleLoading] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const toast = useToast();

  async function handleSubmit() {
    // Toggle spinner
    toggleLoading(true);

    // Submit products
    await onSubmit(products);

    // Remove spinner
    toggleLoading(false);
  }

  function handleChange(products: Product[]) {
    // Cast base values to CSV schema
    const baseValues = defaultValues.map((product) => schemas.csv.cast(product));

    // Store and merge changes
    const changed = products.reduce<Product[]>((products, changedProduct) => {
      // Find base product
      const baseProduct = baseValues.find((_product) => _product.id === changedProduct.id);

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

    // Set products
    setProducts(changed);
  }

  async function handleDownload() {
    try {
      // Cast and flatten default values
      const baseValues = defaultValues
        .map((product) => schemas.csv.cast(product))
        .map((product) => flatten(product));

      // Convert them to CSV
      const csv = await toCSV(baseValues);

      // Download the file
      download("pency.csv", csv);
    } catch (e) {
      // Notify the user if something failed
      toast({
        status: "error",
        title: "Error",
        description: "No se pudo generar la planilla",
      });
    }
  }

  function handleReset() {
    setProducts([]);
    toggleLoading(false);
  }

  return (
    <Drawer
      closeOnOverlayClick={false}
      id="bulk-products"
      isOpen={isOpen}
      size="full"
      onAnimationEnd={handleReset}
      onClose={onClose}
    >
      <DrawerHeader onClose={onClose} />
      <DrawerBody marginBottom={4}>
        <Stack shouldWrapChildren spacing={4}>
          <DrawerTitle>Herramienta de importación / exportación</DrawerTitle>
          {products?.length ? (
            <Table as="table" boxShadow="sm">
              <thead>
                <tr>
                  <th />
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Categoria</th>
                  <th>Disponible</th>
                  <th>Destacado</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id ? "Existente" : "Nuevo"}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.available ? "Si" : "No"}</td>
                    <td>{product.featured ? "Si" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Stack shouldWrapChildren spacing={2}>
              <ProductsCSVInput onChange={handleChange}>Cargar planilla</ProductsCSVInput>
              <Button variantColor="primary" onClick={handleDownload}>
                Descargar planilla
              </Button>
            </Stack>
          )}
        </Stack>
      </DrawerBody>
      {Boolean(products?.length) && (
        <DrawerFooter>
          <Button
            backgroundColor="primary.500"
            color="white"
            data-test-id="submit-bulk-products"
            isLoading={isLoading}
            type="submit"
            variantColor="primary"
            width="100%"
            onClick={handleSubmit}
          >
            Guardar productos
          </Button>
        </DrawerFooter>
      )}
    </Drawer>
  );
};

export default ProductsUpsertDrawer;
