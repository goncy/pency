import React from "react";
import {StackProps, Stack, Text, Tooltip} from "@chakra-ui/core";
import produce from "immer";
import {Message} from "react-hook-form";

import ProductVariantsInput from "../ProductVariantsInput";

import {Product, Variant} from "~/product/types";
import Price from "~/ui/inputs/Price";
import FormControl from "~/ui/form/FormControl";
import HelpCircleIcon from "~/ui/icons/HelpCircle";
import Select from "~/ui/inputs/Select";

interface Props extends Omit<StackProps, "onChange"> {
  value?: Product;
  error?: Message;
  onChange: (value: Product) => void;
}

const ProductInput: React.FC<Props> = ({value: product, onChange, error, ...props}) => {
  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(
      // Produce a new product based on the change
      produce(product, (product) => {
        // Cast as unknown and then number so we can have an empty input, we then validate that with the schema
        product.price = (event.target.value as unknown) as number;
      }),
    );
  }

  function handleOriginalPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(
      // Produce a new product based on the change
      produce(product, (product) => {
        // Cast as unknown and then number so we can have an empty input, we then validate that with the schema
        product.originalPrice = (event.target.value as unknown) as number;
      }),
    );
  }

  function handleVariantsChange(variants: Variant[]) {
    onChange(
      // Produce a new product based on the change
      produce(product, (product) => {
        product.options = variants;
      }),
    );
  }

  function handleVisibilityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const visibility = event.target.value as Product["visibility"];

    onChange(
      // Produce a new product based on the change
      produce(product, (product) => {
        product.visibility = visibility;
      }),
    );
  }

  return (
    <FormControl error={error}>
      <Stack shouldWrapChildren spacing={3} {...props}>
        <Stack isInline alignItems="center">
          <Text fontSize="lg" fontWeight={500} lineHeight="normal">
            {product.title}
          </Text>
          <Tooltip
            hasArrow
            shouldWrapChildren
            aria-label="Descripción del producto"
            label={`[${product.category}] - ${product.description || "Sin descripción"}`}
            placement="top"
            zIndex={1500}
          >
            <HelpCircleIcon size={16} />
          </Tooltip>
        </Stack>
        <Price
          inputProps={{isInvalid: false}}
          rounded="sm"
          value={product.price}
          onChange={handlePriceChange}
        />
        <Price
          inputProps={{isInvalid: false}}
          rounded="sm"
          value={product.originalPrice}
          onChange={handleOriginalPriceChange}
        />
        <ProductVariantsInput value={product.options} onChange={handleVariantsChange} />
        <Select onChange={handleVisibilityChange}>
          <option value="available">Disponible</option>
          <option value="unavailable">Sin stock</option>
          <option value="ask">A consultar</option>
          <option value="hidden">Oculto</option>
        </Select>
      </Stack>
    </FormControl>
  );
};

export default ProductInput;
