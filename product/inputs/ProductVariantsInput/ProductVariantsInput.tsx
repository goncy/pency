import React from "react";
import {Stack} from "@chakra-ui/core";
import produce from "immer";

import {Variant} from "../../types";

import {getVariant} from "./constants";
import OptionInput from "./Option";
import CountInput from "./Count";

import FormControl from "~/ui/form/FormControl";
import IconButton from "~/ui/controls/IconButton";
import ClearableTextField from "~/ui/inputs/ClearableTextField";
import PlusIcon from "~/ui/icons/Plus";
import SwitchInput from "~/ui/inputs/Switch";

interface Props {
  value?: Partial<Variant[]>;
  error?: string;
  onChange: (options: Variant[]) => void;
}

const ProductVariantsInput: React.FC<Props> = ({value = [], error, onChange}) => {
  function handleCountChange(count, index) {
    onChange(
      produce(value, (value) => {
        value[index].count = count;
      }),
    );
  }

  function handleAddVariant() {
    onChange(
      produce(value, (value) => {
        value.push(getVariant());
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

  function handleTitleChange(index, title) {
    onChange(
      produce(value, (value) => {
        value[index].title = title;
      }),
    );
  }

  function handleRequiredChange(index, checked) {
    onChange(
      produce(value, (value) => {
        value[index].required = checked;
      }),
    );
  }

  return (
    <Stack spacing={3}>
      {value?.map((option, index) => (
        <Stack
          key={option.id}
          shouldWrapChildren
          borderBottomWidth={1}
          borderColor="gray.200"
          paddingBottom={3}
          spacing={3}
        >
          <FormControl
            isRequired
            error={error === "title" && !value[index].title && "Este campo es requerido"}
            help="Utilizá solo 1 palabra. Se mostrará: Eligir color"
          >
            <ClearableTextField
              placeholder="Adicionales"
              value={option.title}
              onChange={(event) => handleTitleChange(index, event.target.value)}
              onClear={() => handleRemove(index)}
            />
          </FormControl>
          <FormControl
            help="Al activarlo, el usuario deberá indicar su elección antes de continuar."
            name="required"
          >
            <SwitchInput
              checked={option.required}
              label="Obligatorio"
              name="required"
              onChange={(checked) => handleRequiredChange(index, checked)}
            />
          </FormControl>
          <FormControl isRequired label="Cuantas opciones podrá elegir?">
            <CountInput
              value={option.count}
              onChange={(count) => handleCountChange(count, index)}
            />
          </FormControl>
          <OptionInput
            error={error}
            index={index}
            value={option}
            onChange={(value) => handleChange(index, value)}
          />
        </Stack>
      ))}
      <IconButton
        fontWeight="normal"
        justifyContent="flex-start"
        leftIcon={PlusIcon}
        onClick={handleAddVariant}
      >
        Agregar variante
      </IconButton>
    </Stack>
  );
};

export default ProductVariantsInput;
