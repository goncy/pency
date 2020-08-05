import React from "react";
import * as yup from "yup";
import {Box, Input, ButtonProps} from "@chakra-ui/core";

import {fromCSV} from "~/utils/csv";
import {useToast} from "~/hooks/toast";
import {Product} from "~/product/types";
import schemas from "~/product/schemas";

interface Props extends Omit<ButtonProps, "onChange" | "leftIcon" | "rightIcon" | "children"> {
  onChange?: (products: Partial<Product>[]) => void;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  children?: React.ReactNode;
  isCollapsable?: boolean;
}

// CSV Schema
const schema = yup.object<Partial<Product>>({
  category: yup.string().trim().required("La categoría es requerida"),
  description: yup.string().default("").nullable(),
  price: yup.number().typeError("El precio debe ser un número").required("El precio es requerido"),
  title: yup.string().required("El título es requerido"),
});

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

      // Cast data
      const data: Product[] = rows.map((product) => schemas.client.create.cast(product));

      // Validate
      data.forEach((product) => {
        schema.validateSync(product);
      });

      // Reset loading
      setLoading(false);

      // Call on change with the value
      onChange(data);

      // Reset input
      event.target.value = "";
    } catch (error) {
      // Reset loading
      setLoading(false);

      // Show toast to user
      toast({
        title: "Error",
        description: `Hubo un error procesando el archivo, asegurate de que los campos requeridos esten completados y sean válidos (${error.message})`,
        status: "error",
      });

      // Reset input
      event.target.value = "";
    }
  }

  return (
    <Box position="relative">
      {children}
      <Input
        accept=".csv"
        height="100%"
        isDisabled={isLoading}
        left={0}
        name="image"
        placeholder="Seleccionar archivo"
        position="absolute"
        style={{opacity: 0}}
        title="Cargar CSV"
        top={0}
        type="file"
        width="100%"
        zIndex={1}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ProductsCSVInput;
