import React from "react";
import {Stack} from "@chakra-ui/core";
import produce from "immer";

import {Field} from "../../types";

import {getTextField, getRadioField} from "./constants";
import FieldInput from "./Field";
import TypeInput from "./Type";

import FormControl from "~/ui/controls/FormControl";
import IconButton from "~/ui/controls/IconButton";
import ClearableTextField from "~/ui/inputs/ClearableTextField";
import PlusIcon from "~/ui/icons/Plus";

interface Props {
  value?: Partial<Field[]>;
  error?: string;
  onChange: (options: Field[]) => void;
}

const ExtraFieldsInput: React.FC<Props> = ({value = [], error, onChange}) => {
  function handleTypeChange(type, index) {
    onChange(
      produce(value, (value) => {
        const {title} = value[index];

        if (type === "text") {
          value[index] = getTextField({title});
        } else if (type === "radio") {
          value[index] = getRadioField({title});
        }
      }),
    );
  }

  function handleAddField() {
    onChange(
      produce(value, (value) => {
        value.push(getTextField());
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
          >
            <ClearableTextField
              placeholder="Forma de pago"
              value={option.title}
              onChange={(event) => handleTitleChange(index, event.target.value)}
              onClear={() => handleRemove(index)}
            />
          </FormControl>
          <FormControl isRequired>
            <TypeInput value={option.type} onChange={(type) => handleTypeChange(type, index)} />
          </FormControl>
          <FieldInput
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
        onClick={handleAddField}
      >
        Agregar campo
      </IconButton>
    </Stack>
  );
};

export default ExtraFieldsInput;
