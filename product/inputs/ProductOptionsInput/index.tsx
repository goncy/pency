import React from "react";
import produce from "immer";
import {Stack, Button, Select} from "@chakra-ui/core";

import {Option} from "../../types";

import {DEFAULT_OPTIONS} from "./constants";
import SingleOptionInput from "./SingleOption";
import MultipleOptionInput from "./MultipleOption";

interface Props {
  value?: Option[];
  onChange: (value: Props["value"]) => void;
}

const ProductOptionsInput: React.FC<Props> = ({value, onChange}) => {
  function handleAdd() {
    const option = DEFAULT_OPTIONS.single;

    onChange(value ? value.concat(option) : [option]);
  }

  function handleTypeChange(type: Option["type"], index) {
    onChange(
      produce(value, (value) => {
        value[index] = DEFAULT_OPTIONS[type];
      }),
    );
  }

  function handleChange(option, index) {
    onChange(
      produce(value, (value) => {
        value[index] = option;
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

  return (
    <Stack spacing={3}>
      {value?.map((option, index) => (
        <Stack key={option.id} backgroundColor="gray.100" padding={3} spacing={3}>
          <Select
            value={option.type}
            onChange={(event) => handleTypeChange(event.target.value as Option["type"], index)}
          >
            <option value="single">Una opción</option>
            <option value="multiple">Multiples opciónes</option>
          </Select>
          {option.type === "single" && (
            <SingleOptionInput value={option} onChange={(value) => handleChange(value, index)} />
          )}
          {option.type === "multiple" && (
            <MultipleOptionInput value={option} onChange={(value) => handleChange(value, index)} />
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

export default ProductOptionsInput;
