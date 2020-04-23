import React from "react";
import produce from "immer";
import {
  Flex,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  Box,
} from "@chakra-ui/core";
import {useForm, Controller} from "react-hook-form";

import {Product} from "../types";
import ProductLimitedCheckboxInput from "../inputs/ProductLimitedCheckboxInput";
import ProductRadioInput from "../inputs/ProductRadioInput";

interface Props {
  options: Product["options"];
  onSubmit: (values: Product["options"]) => void;
}

const ProductOptionsForm: React.FC<Props> = ({options, onSubmit}) => {
  const {handleSubmit: submit, control, errors} = useForm<{options: Product["options"]}>();

  function handleSubmit(values) {
    onSubmit(
      produce(options, (options) => {
        values.options.forEach((option, index) => {
          options[index].value = option.value;
        });
      }),
    );
  }

  return (
    <Flex direction="column" height="100%" justifyContent="space-between" width="100%">
      <Stack overflowY="auto" spacing={4}>
        {options.map((option, index) => {
          switch (option.type) {
            case "single": {
              return (
                <FormControl key={option.id} isInvalid={Boolean(errors.options?.[index])} mb={4}>
                  <FormLabel htmlFor={`options[${index}]`}>{option.title} (elegí 1)</FormLabel>
                  <Controller
                    as={ProductRadioInput}
                    control={control}
                    labelProp="title"
                    name={`options[${index}].value`}
                    options={option.options}
                    rules={{required: true}}
                    valueProp="title"
                  />
                  <FormErrorMessage>
                    {errors.options?.[index] && "Seleccioná una opción"}
                  </FormErrorMessage>
                </FormControl>
              );
            }

            case "multiple": {
              return (
                <FormControl key={option.id} isInvalid={Boolean(errors.options?.[index])} mb={4}>
                  <FormLabel htmlFor={`options[${index}]`}>
                    {option.title} (elegí {option.count})
                  </FormLabel>
                  <Controller
                    as={ProductLimitedCheckboxInput}
                    control={control}
                    labelProp="title"
                    limit={option.count}
                    name={`options[${index}].value`}
                    options={option.options}
                    rules={{
                      required: true,
                      validate: (values) => values?.length === option.count,
                    }}
                    valueProp="title"
                  />
                  <FormErrorMessage>
                    {errors.options?.[index] && `Seleccioná ${option.count}`}
                  </FormErrorMessage>
                </FormControl>
              );
            }

            default:
              return null;
          }
        })}
      </Stack>
      <Box>
        <Divider marginY={4} />
        <Button
          variantColor="primary"
          width="100%"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();

            submit(handleSubmit)(event);
          }}
        >
          Agregar
        </Button>
      </Box>
    </Flex>
  );
};

export default ProductOptionsForm;
