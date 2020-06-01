import React from "react";
import produce from "immer";
import {Stack, FormControl, FormLabel, FormErrorMessage} from "@chakra-ui/core";
import {useForm, Controller} from "react-hook-form";

import {Product} from "../types";
import ProductLimitedCheckboxInput from "../inputs/ProductCheckboxInput";

interface Props {
  options: Product["options"];
  onSubmit: (values: Product["options"]) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const ProductOptionsForm: React.FC<Props> = ({children, options, onSubmit}) => {
  const {handleSubmit: submit, formState, control, errors} = useForm<{
    options: Product["options"];
  }>();

  function handleSubmit(values) {
    onSubmit(
      produce(options, (options) => {
        values.options.forEach((option, index) => {
          options[index].value = option.value;
        });
      }),
    );
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack overflowY="auto" spacing={4}>
          {options.map((option, index) => {
            return (
              <FormControl key={option.id} isInvalid={Boolean(errors.options?.[index])} mb={4}>
                <FormLabel htmlFor={`options[${index}]`}>
                  {`${option.title} ${option.count ? `(Máximo ${option.count})` : ""}`}
                </FormLabel>
                <Controller
                  as={ProductLimitedCheckboxInput}
                  control={control}
                  defaultValue={[]}
                  label={(option) => `${option.title} ${option.price ? `+ $${option.price}` : ""}`}
                  limit={option.count}
                  name={`options[${index}].value`}
                  options={option.options}
                  rules={{
                    required: Boolean(option.count),
                    validate: (values) => (option.count ? values?.length <= option.count : true),
                  }}
                  valueProp="title"
                />
                <FormErrorMessage>
                  {errors.options?.[index] && `Seleccioná ${option.count} opciones`}
                </FormErrorMessage>
              </FormControl>
            );
          })}
        </Stack>
      </form>
    ),
  });
};

export default ProductOptionsForm;
