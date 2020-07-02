import React from "react";
import {StackProps, Stack, Grid, Text} from "@chakra-ui/core";
import produce from "immer";
import {Message} from "react-hook-form";

import {Product} from "~/product/types";
import Price from "~/ui/inputs/Price";
import FormControl from "~/ui/form/FormControl";

interface Props extends Omit<StackProps, "onChange"> {
  value?: Product;
  error?: Message;
  onChange: (value: Product) => void;
}

const ProductInput: React.FC<Props> = ({value: product, onChange, error, ...props}) => {
  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(
      produce(product, (product) => {
        product.price = Number(event.target.value);
      }),
    );
  }

  function handleVariantPriceChange(variantIndex: number, optionIndex: number, price: number) {
    onChange(
      produce(product, (product) => {
        product.options[variantIndex].options[optionIndex].price = Number(price);
      }),
    );
  }

  return (
    <FormControl error={error}>
      <Stack spacing={6} {...props}>
        <Stack spacing={2}>
          <Text fontSize="2xl" fontWeight={500} lineHeight="normal">
            {product.title}
          </Text>
          <Price
            inputProps={{isInvalid: false}}
            rounded="sm"
            value={product.price}
            onChange={handlePriceChange}
          />
        </Stack>
        {product.options?.length && (
          <Stack spacing={6}>
            {product.options.map((variant, variantIndex) => (
              <Stack key={variant.id} spacing={2}>
                <Text fontSize="xl">{variant.title}</Text>
                <Grid gridGap={2} gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))">
                  {variant.options?.map((option, optionIndex) => (
                    <FormControl key={option.id} label={option.title}>
                      <Price
                        inputProps={{isInvalid: false}}
                        rounded="sm"
                        size="sm"
                        value={option.price}
                        onChange={(event) =>
                          handleVariantPriceChange(variantIndex, optionIndex, event.target.value)
                        }
                      />
                    </FormControl>
                  ))}
                </Grid>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </FormControl>
  );
};

export default ProductInput;
