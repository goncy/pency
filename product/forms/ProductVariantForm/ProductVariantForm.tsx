import React from "react";
import {Stack} from "@chakra-ui/core";
import {useForm, Controller, FieldError} from "react-hook-form";

import {Variant, Product} from "../../types";
import ProductVariantSelector, {
  validator as ProductVariantSelectorValidator,
} from "../../inputs/ProductVariantSelector";

import FormControl from "~/ui/form/FormControl";

interface Props {
  defaultValues: Variant[];
  type: Product["type"];
  onSubmit: (values: Variant[]) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    watch: () => FormData;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

type FormData = Record<string, Variant>;

const ProductVariantForm: React.FC<Props> = ({children, defaultValues, type, onSubmit}) => {
  const {handleSubmit: submit, formState, control, errors, watch, setError, clearError} = useForm<
    FormData
  >({
    defaultValues: defaultValues.reduce(
      (acc, value, index) => ({...acc, [`options[${index}]`]: value}),
      {},
    ),
  });

  function handleSubmit(formData: FormData) {
    // Store variants
    const variants = (formData.options as unknown) as Variant[];

    // If its not valid, return
    if (type === "variant" && !variants?.some((variant) => variant.value?.length)) {
      return setError("type", "variant", "Al menos una opción debe ser seleccionada");
    }

    // Submit variants
    onSubmit(variants);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    watch,
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <FormControl
          error={((errors.type as unknown) as FieldError)?.message}
          onClick={() => clearError("type")}
        >
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
                  note={
                    variant.count > 1 &&
                    `(${variant.required ? `Seleccioná` : `Máx.`} ${variant.count})`
                  }
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
        </FormControl>
      </form>
    ),
  });
};

export default ProductVariantForm;
