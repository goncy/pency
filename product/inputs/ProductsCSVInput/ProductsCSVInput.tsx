import React from "react";
import {PseudoBox, Input} from "@chakra-ui/core";
import {unflatten} from "flat";

import {fromCSV} from "~/utils/csv";
import {useToast} from "~/hooks/toast";
import {Product} from "~/product/types";
import Button from "~/ui/controls/Button";
import schemas from "~/product/schemas";

interface Props {
  onChange?: (products: Partial<Product>[]) => void;
}

const ProductsCSVInput: React.FC<Props> = ({onChange, children}) => {
  // Track loading state
  const [isLoading, setLoading] = React.useState(false);

  // Get a toast instance
  const toast = useToast();

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Perist event so we can reset on fail
    event.persist();

    // Store file
    const file = event.target.files?.[0];

    // Return if closed without selecting a file
    if (!file) return;

    // Toggle loading
    setLoading(true);

    try {
      // Parse file
      const rows = await fromCSV<Partial<Product>>(file);
      const data: Product[] = rows
        // Unflatten
        .map((product) => unflatten<Partial<Product>, Product>(product))
        // Remove empty options and variants
        .map((product) => ({
          ...product,
          options: product.options
            ? product.options
                ?.filter((variant) => variant.id)
                .map((variant) => ({
                  ...variant,
                  options: variant.options.filter((option) => option.id),
                }))
            : [],
        }))
        .map((product) => schemas.csv.cast(product));

      // Store summary
      const summary = {
        resolved: [],
        rejected: [],
      };

      // Store products
      const value = data.map((product) => {
        // If we have a product id
        if (product.id) {
          // Cast it
          const casted = schemas.client.update.cast(product);

          // If its valid
          if (schemas.client.update.isValidSync(casted)) {
            // Send it to resolved summary
            summary.resolved.push(casted.title);

            return casted;
          } else {
            // Otherwise send it to rejected summary
            summary.rejected.push(product?.title);

            // Return product
            return product;
          }
        } else {
          // Cast it
          const casted = schemas.client.create.cast(product);

          // If its valid
          if (schemas.client.create.isValidSync(casted)) {
            // Send it to resolved summary
            summary.resolved.push(casted.title);

            return casted;
          } else {
            // Otherwise send it to rejected summary
            summary.rejected.push(product?.title);

            // Return product
            return product;
          }
        }
      });

      // If we have rejected products
      if (summary.rejected.length) {
        // Reset loading
        setLoading(false);

        // Show toast to user
        toast({
          title: "Error",
          description: `Hubo un error procesando los productos (${summary.rejected.join(", ")})`,
          status: "error",
        });

        // Reset input
        event.target.value = "";
      } else {
        // Reset loading
        setLoading(false);

        // Call on change with the value
        onChange(value);

        // Reset input
        event.target.value = "";
      }
    } catch (e) {
      // Reset loading
      setLoading(false);

      // Show toast to user
      toast({
        title: "Error",
        description: `Hubo un error procesando el archivo, asegurate de que los campos requeridos esten completados y sean válidos`,
        status: "error",
      });

      // Reset input
      event.target.value = "";
    }
  }

  return (
    <PseudoBox
      alignItems="center"
      display="flex"
      justifyContent="center"
      position="relative"
      width="fit-content"
    >
      <Input
        accept=".csv"
        height="100%"
        isDisabled={isLoading}
        left={0}
        name="image"
        opacity={0}
        placeholder="Seleccionar archivo"
        position="absolute"
        title="Cargar CSV"
        top={0}
        type="file"
        width="100%"
        zIndex={1}
        onChange={handleChange}
      />
      <Button isLoading={isLoading} variantColor="primary">
        {children}
      </Button>
    </PseudoBox>
  );
};

export default ProductsCSVInput;
