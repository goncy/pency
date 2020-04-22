import React from "react";
import produce from "immer";
import {Flex, Stack, Button, FormControl, FormLabel, FormErrorMessage} from "@chakra-ui/core";
import {useForm, Controller} from "react-hook-form";

import {Product} from "../types";

import MultipleOptions from "~/ui/inputs/MultipleOptions";
import SingleOption from "~/ui/inputs/SingleOption";

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
      <Stack spacing={{base: 3, sm: 6}}>
        {options.map((option, index) => {
          switch (option.type) {
            case "single": {
              return (
                <FormControl
                  key={option.id}
                  isInvalid={Boolean(errors.options?.[index])}
                  mb={{base: 3, sm: 6}}
                >
                  <FormLabel htmlFor={`options[${index}]`}>{option.title} (elegí 1)</FormLabel>
                  <Controller
                    as={SingleOption}
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
                <FormControl
                  key={option.id}
                  isInvalid={Boolean(errors.options?.[index])}
                  mb={{base: 3, sm: 6}}
                >
                  <FormLabel htmlFor={`options[${index}]`}>
                    {option.title} (elegí {option.count})
                  </FormLabel>
                  <Controller
                    as={MultipleOptions}
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
      <Button
        variantColor="primary"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();

          submit(handleSubmit)(event);
        }}
      >
        Agregar
      </Button>
    </Flex>
  );
};

export default ProductOptionsForm;
