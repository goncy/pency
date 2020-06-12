import React from "react";
import produce from "immer";
import {Stack} from "@chakra-ui/core";
import {useForm, Controller, FieldError} from "react-hook-form";

import {Variant} from "../../types";
import ProductOptionSelectorInput from "../../inputs/ProductOptionSelectorInput";

import validator from "./validator";

import FormControl from "~/ui/controls/FormControl";

interface Props {
  defaultValues: Variant[];
  onSubmit: (values: Variant[]) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

interface FormData {
  variants: Variant[];
}

const ProductVariantForm: React.FC<Props> = ({children, defaultValues, onSubmit}) => {
  const {handleSubmit: submit, formState, control, errors} = useForm<FormData>({
    defaultValues: {
      variants: defaultValues,
    },
  });

  function handleSubmit({variants}: FormData) {
    const result = produce(defaultValues, (defaultValues) => {
      variants?.forEach((option, index) => {
        defaultValues[index].value = option.value;
      });
    });

    onSubmit(result);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack overflowY="auto" spacing={4}>
          {defaultValues.map((variant, index) => {
            const error = ((errors.variants?.[index]?.value as unknown) as FieldError)?.message;

            return (
              <FormControl
                key={variant.id}
                error={error}
                label={`${variant.title} ${variant.count ? `(Máximo ${variant.count})` : ""}`}
                name={`variants[${index}]`}
              >
                <Controller
                  as={ProductOptionSelectorInput}
                  control={control}
                  defaultValue={[]}
                  label={(option) => `${option.title} ${option.price ? `+ $${option.price}` : ""}`}
                  limit={variant.count}
                  name={`variants[${index}].value`}
                  options={variant.options}
                  rules={{
                    validate: validator(variant),
                  }}
                  valueProp="title"
                />
              </FormControl>
            );
          })}
        </Stack>
      </form>
    ),
  });
};

export default ProductVariantForm;
