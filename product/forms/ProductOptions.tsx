import React from "react";
import produce from "immer";
import {Box, Stack, Button, FormControl, FormLabel, FormErrorMessage} from "@chakra-ui/core";
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
    <Box>
      {options.map((option, index) => {
        switch (option.type) {
          case "single": {
            return (
              <Stack key={option.id} spacing={{base: 3, sm: 6}}>
                <FormControl isInvalid={Boolean(errors.options?.[index])} mb={{base: 3, sm: 6}}>
                  <FormLabel htmlFor={`options[${index}]`}>{option.title}</FormLabel>
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
              </Stack>
            );
          }

          case "multiple": {
            return (
              <Stack key={option.id} spacing={{base: 3, sm: 6}}>
                <FormControl isInvalid={Boolean(errors.options?.[index])} mb={{base: 3, sm: 6}}>
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
              </Stack>
            );
          }

          default:
            return null;
        }
      })}
      <Button
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();

          submit(handleSubmit)(event);
        }}
      >
        Agregar
      </Button>
    </Box>
  );
};

export default ProductOptionsForm;
