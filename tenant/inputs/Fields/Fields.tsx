import React from "react";
import {Stack} from "@chakra-ui/core";
import produce from "immer";
import {FieldError} from "react-hook-form";

import {Field} from "../../types";

import {getTextField, getRadioField} from "./constants";
import FieldInput from "./Field";
import TypeInput from "./Type";

import FormControl from "~/ui/form/FormControl";
import IconButton from "~/ui/controls/IconButton";
import ClearableTextField from "~/ui/inputs/ClearableTextField";
import PlusIcon from "~/ui/icons/Plus";
import SwitchInput from "~/ui/inputs/Switch";
import ChevronDownIcon from "~/ui/icons/ChevronDown";
import ChevronUpIcon from "~/ui/icons/ChevronUp";

interface Props {
  value?: Partial<Field[]>;
  error?: FieldError;
  onChange: (options: Field[]) => void;
}

const FieldsInput: React.FC<Props> = ({value = [], error: _error, onChange}) => {
  const [active, setActive] = React.useState(null);
  const error = React.useMemo(() => {
    if (!_error) return null;

    const [index, type, ...message] = (_error.message as string).split("|");

    return {index: Number(index), type, message: message.join("|")};
  }, [_error]);

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
    setActive(value.length);
  }

  function handleRemove(index) {
    onChange(
      produce(value, (value) => {
        value.splice(index, 1);
      }),
    );
    setActive(null);
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
      {value?.map((option, index) => {
        const fieldError = error?.index === index ? error : null;

        return index === active ? (
          <Stack
            key={option.id}
            shouldWrapChildren
            borderBottomWidth={1}
            borderColor="gray.200"
            paddingBottom={3}
            spacing={3}
          >
            <Stack isInline spacing={2} width="100%">
              <FormControl
                isRequired
                error={fieldError?.type === "title" && error.message}
                flex={1}
              >
                <ClearableTextField
                  backgroundColor="inherit"
                  placeholder="Forma de pago"
                  value={option.title}
                  onChange={(event) => handleTitleChange(index, event.target.value)}
                  onClear={() => handleRemove(index)}
                />
              </FormControl>
              <IconButton rightIcon={ChevronUpIcon} onClick={() => setActive(null)} />
            </Stack>
            <FormControl name="required">
              <SwitchInput
                checked={option.required}
                label="Obligatorio"
                name="required"
                onChange={(checked) => handleRequiredChange(index, checked)}
              />
            </FormControl>
            <FormControl isRequired>
              <TypeInput value={option.type} onChange={(type) => handleTypeChange(type, index)} />
            </FormControl>
            <FieldInput
              error={fieldError}
              index={index}
              value={option}
              onChange={(value) => handleChange(index, value)}
            />
          </Stack>
        ) : (
          <IconButton
            key={option.id}
            borderColor={fieldError ? "red.500" : "transparent"}
            borderWidth={fieldError ? 2 : 0}
            fontWeight="normal"
            justifyContent="space-between"
            rightIcon={ChevronDownIcon}
            onClick={() => setActive(index)}
          >
            {option.title || "[sin título]"}
          </IconButton>
        );
      })}
      <IconButton
        fontWeight="normal"
        justifyContent="space-between"
        rightIcon={PlusIcon}
        onClick={handleAddField}
      >
        Agregar campo
      </IconButton>
    </Stack>
  );
};

export default FieldsInput;
