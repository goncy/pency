import React from "react";
import {StackProps, Stack, Text} from "@chakra-ui/core";
import produce from "immer";
import {Message} from "react-hook-form";

import ProductVariantsInput from "../ProductVariantsInput";

import {Product, Variant} from "~/product/types";
import Price from "~/ui/inputs/Price";
import ImageInput from "~/ui/inputs/Image";
import ChevronDownIcon from "~/ui/icons/ChevronDown";
import ChevronUpIcon from "~/ui/icons/ChevronUp";

interface Props extends Omit<StackProps, "onChange"> {
  value?: Product;
  error?: Message;
  onChange: (value: Product) => void;
}

const ProductInput: React.FC<Props> = ({value: product, onChange, error, ...props}) => {
  // Track toggle state
  const [isToggled, toggle] = React.useState(false);

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(
      // Produce a new product based on the change
      produce(product, (product) => {
        // Cast as unknown and then number so we can have an empty input, we then validate that with the schema
        product.price = (event.target.value as unknown) as number;
      }),
    );
  }

  function handleImageChange(image: Product["image"]) {
    onChange(
      // Produce a new product based on the change
      produce(product, (product) => {
        // Cast as unknown and then number so we can have an empty input, we then validate that with the schema
        product.image = image;
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

  function handleToggle() {
    toggle(!isToggled);
  }

  return (
    <Stack shouldWrapChildren padding={3} spacing={3} {...props}>
      <Stack
        isInline
        shouldWrapChildren
        alignItems="center"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack isInline shouldWrapChildren alignItems="center" spacing={4}>
          <ImageInput value={product.image} onChange={handleImageChange} />
          <Text fontSize="lg" fontWeight={500} lineHeight="normal">
            {product.title}
          </Text>
        </Stack>
        <Stack isInline shouldWrapChildren alignItems="center" spacing={4}>
          <Text fontSize="sm" textAlign="left" width={240}>
            {product.category}
          </Text>
          <Price
            inputProps={{isInvalid: false}}
            maxWidth={120}
            rounded="sm"
            value={product.price}
            onChange={handlePriceChange}
          />
          {isToggled ? (
            <ChevronUpIcon cursor="pointer" onClick={handleToggle} />
          ) : (
            <ChevronDownIcon cursor="pointer" onClick={handleToggle} />
          )}
        </Stack>
      </Stack>
      {isToggled && (
        <ProductVariantsInput
          maxWidth={480}
          value={product.options}
          onChange={handleVariantsChange}
        />
      )}
      {error && (
        <Text backgroundColor="red.100" color="red.500" padding={2} rounded="md">
          {error}
        </Text>
      )}
    </Stack>
  );
};

export default ProductInput;
