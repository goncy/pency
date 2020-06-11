import React from "react";
import produce from "immer";
import {Stack} from "@chakra-ui/core";
import {useForm, Controller, FieldError} from "react-hook-form";

import {Product} from "../../types";
import ProductLimitedCheckboxInput from "../../inputs/ProductCheckboxInput";

import validator from "./validator";

import FormControl from "~/ui/controls/FormControl";

interface Props {
  defaultValues: Product["options"];
  onSubmit: (values: Product["options"]) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

interface FormData {
  options: Product["options"];
}

const ProductOptionsForm: React.FC<Props> = ({children, defaultValues, onSubmit}) => {
  const {handleSubmit: submit, formState, control, errors} = useForm<FormData>({
    defaultValues: {
      options: defaultValues,
    },
  });

  function handleSubmit(values) {
    onSubmit(
      produce(defaultValues, (defaultValues) => {
        values.options?.forEach((option, index) => {
          defaultValues[index].value = option.value;
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
          {defaultValues.map((option, index) => {
            const error = ((errors.options?.[index]?.value as unknown) as FieldError)?.message;

            return (
              <FormControl
                key={option.id}
                error={error}
                label={`${option.title} ${option.count ? `(Máximo ${option.count})` : ""}`}
                name={`options[${index}]`}
              >
                <Controller
                  as={ProductLimitedCheckboxInput}
                  control={control}
                  defaultValue={[]}
                  label={(option) => `${option.title} ${option.price ? `+ $${option.price}` : ""}`}
                  limit={option.count}
                  name={`options[${index}].value`}
                  options={option.options}
                  rules={{
                    validate: validator(option),
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

export default ProductOptionsForm;
