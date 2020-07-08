import React from "react";
import {Stack} from "@chakra-ui/core";
import {useForm, Controller, FieldError} from "react-hook-form";

import {Product} from "../../types";

import FormControl from "~/ui/form/FormControl";
import ProductInput, {validator as ProductInputValidator} from "~/product/inputs/ProductInput";

interface Props {
  defaultValues: Product[];
  onSubmit: (values: Product[]) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

interface FormData {
  products: Product[];
}

const ProductsForm: React.FC<Props> = ({children, defaultValues, onSubmit}) => {
  const [isLoading, setLoading] = React.useState(false);
  const {handleSubmit: submit, control, errors} = useForm<FormData>({
    defaultValues: {products: defaultValues},
  });

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    await onSubmit(formData.products);

    setLoading(false);
  }

  return children({
    isLoading,
    submit: submit(handleSubmit),
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack overflowY="auto" paddingLeft={1} spacing={6}>
          {defaultValues.map((product, index) => {
            const error = (errors.products?.[index] as FieldError)?.message;

            return (
              <FormControl
                key={product.id || index}
                borderBottomWidth={1}
                name={`products[${index}]`}
                paddingBottom={6}
              >
                <Controller
                  as={ProductInput}
                  control={control}
                  error={error}
                  name={`products[${index}]`}
                  rules={{
                    validate: ProductInputValidator,
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

export default ProductsForm;
