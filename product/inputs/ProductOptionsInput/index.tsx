import React from "react";
import {Stack, Button, Select} from "@chakra-ui/core";
import produce from "immer";
import {useFormContext} from "react-hook-form";

import {Option} from "../../types/options";

import {DEFAULT_OPTIONS} from "./constants";
import SingleOptionInput from "./SingleOption";
import MultipleOptionInput from "./MultipleOption";
import validator from "./validator";

import FormControl from "~/ui/controls/FormControl";

interface Props {
  value?: Partial<Option[]>;
  onChange: (options: Option[]) => void;
}

const ProductOptionsInput: React.FC<Props> = ({value = [], onChange}) => {
  const {errors} = useFormContext();
  const error = errors.options?.type;

  function handleTypeChange(type, index) {
    onChange(
      produce(value, (value) => {
        value[index] = DEFAULT_OPTIONS[type];
      }),
    );
  }

  function handleAdd() {
    onChange(
      produce(value, (value) => {
        value.push(DEFAULT_OPTIONS["single"]);
      }),
    );
  }

  function handleRemove(index) {
    onChange(
      produce(value, (value) => {
        value.splice(index, 1);
      }),
    );
  }

  function handleChange(index, option) {
    onChange(
      produce(value, (value) => {
        value[index] = option;
      }),
    );
  }

  return (
    <Stack spacing={3}>
      {value?.map((option, index) => (
        <Stack key={option.id} backgroundColor="gray.100" padding={3} spacing={3}>
          <FormControl isRequired label="Tipo">
            <Select
              value={option.type}
              onChange={(event) => handleTypeChange(event.target.value, index)}
            >
              <option value="single">Selección única</option>
              <option value="multiple">Multiples selecciones</option>
            </Select>
          </FormControl>
          {option.type === "single" && (
            <SingleOptionInput
              error={error}
              index={index}
              value={option}
              onChange={(value) => handleChange(index, value)}
            />
          )}
          {option.type === "multiple" && (
            <MultipleOptionInput
              error={error}
              index={index}
              value={option}
              onChange={(value) => handleChange(index, value)}
            />
          )}
          <Button
            mt={3}
            size="md"
            variant="ghost"
            variantColor="red"
            onClick={() => handleRemove(index)}
          >
            Borrar opción
          </Button>
        </Stack>
      ))}
      <Button onClick={handleAdd}>Agregar opción</Button>
    </Stack>
  );
};

export {validator};

export default ProductOptionsInput;
