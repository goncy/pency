import React from "react";
import {Stack, PseudoBox} from "@chakra-ui/core";
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
        <Stack overflowY="auto" spacing={0}>
          {defaultValues.map((product, index) => {
            const error = ((errors.products?.[index] as unknown) as FieldError)?.message;

            return (
              <PseudoBox
                key={product.id || index}
                _first={{borderTopWidth: 1}}
                borderBottomWidth={1}
              >
                <FormControl name={`products[${index}]`}>
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
              </PseudoBox>
            );
          })}
        </Stack>
      </form>
    ),
  });
};

export default ProductsForm;
