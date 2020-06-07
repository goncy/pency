import React from "react";
import produce from "immer";
import {Stack, FormControl, FormLabel, FormErrorMessage, Flex, Badge, Text} from "@chakra-ui/core";
import {useForm, Controller} from "react-hook-form";

import {Product} from "../types";
import ProductLimitedCheckboxInput from "../inputs/ProductCheckboxInput";
import ProductQuantityInput from "../inputs/ProductQuantityInput";

interface Props {
  options: Product["options"];
  onSubmit: (props: {quantity: number; options?: Product["options"]}) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    watch: () => any;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const ProductOptionsForm: React.FC<Props> = ({children, options, onSubmit}) => {
  const {handleSubmit: submit, formState, control, errors, watch} = useForm<{
    options: Product["options"];
    quantity: number;
  }>({
    defaultValues: {
      quantity: 1,
    },
  });

  function handleSubmit(values) {
    onSubmit({
      options: produce(options, (options) => {
        values.options.forEach((option, index) => {
          options[index].value = option.value;
        });
      }),
      quantity: values.quantity,
    });
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    watch,
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack overflowY="auto" spacing={6}>
          {options.map((option, index) => {
            return (
              <FormControl
                key={option.id}
                fontSize="sm"
                isInvalid={Boolean(errors.options?.[index])}
                mb={4}
              >
                <FormLabel fontSize="sm" htmlFor={`options[${index}]`} mb={2}>
                  <span>{option.title}</span>
                  {!!option.count && (
                    <Text as="span" color="gray.500" fontWeight="normal" ml={2}>
                      (Máx. {option.count})
                    </Text>
                  )}
                </FormLabel>
                <Controller
                  as={ProductLimitedCheckboxInput}
                  control={control}
                  defaultValue={[]}
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
          <FormControl>
            <FormLabel fontSize="sm" mb="2">
              Cantidad
            </FormLabel>
            <Controller
              as={ProductQuantityInput}
              control={control}
              defaultValue={1}
              name="quantity"
            />
          </FormControl>
        </Stack>
      </form>
    ),
  });
};

export default ProductOptionsForm;
