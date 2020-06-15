import React from "react";
import {Stack} from "@chakra-ui/core";
import {useForm, Controller, FieldError} from "react-hook-form";

import {Variant} from "../../types";
import ProductVariantSelector, {
  validator as ProductVariantSelectorValidator,
} from "../../inputs/ProductVariantSelector";

import FormControl from "~/ui/form/FormControl";

interface Props {
  defaultValues: Variant[];
  onSubmit: (values: Variant[]) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    watch: () => FormData;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

type FormData = Record<string, Variant>;

const ProductVariantForm: React.FC<Props> = ({children, defaultValues, onSubmit}) => {
  const {handleSubmit: submit, formState, control, errors, watch} = useForm<FormData>({
    defaultValues: defaultValues.reduce(
      (acc, value, index) => ({...acc, [`options[${index}]`]: value}),
      {},
    ),
  });

  function handleSubmit(formData: FormData) {
    onSubmit((formData.options as unknown) as Variant[]);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    watch,
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack overflowY="auto" paddingLeft={1} spacing={6}>
          {defaultValues.map((variant, index) => {
            const error = ((errors.options?.[index] as unknown) as FieldError)?.message;

            return (
              <FormControl
                key={variant.id}
                error={error}
                isRequired={variant.required}
                label={variant.title}
                name={`options[${index}]`}
                note={variant.count > 1 && `(Máx. ${variant.count})`}
              >
                <Controller
                  as={ProductVariantSelector}
                  control={control}
                  limit={variant.count}
                  name={`options[${index}]`}
                  rules={{
                    validate: ProductVariantSelectorValidator,
                  }}
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
