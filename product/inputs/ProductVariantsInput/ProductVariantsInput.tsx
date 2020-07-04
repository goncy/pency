import React from "react";
import {Stack} from "@chakra-ui/core";
import produce from "immer";
import {FieldError} from "react-hook-form";

import {Variant} from "../../types";

import {getVariant} from "./constants";
import OptionInput from "./Option";
import CountInput from "./Count";

import FormControl from "~/ui/form/FormControl";
import IconButton from "~/ui/controls/IconButton";
import ClearableTextField from "~/ui/inputs/ClearableTextField";
import PlusIcon from "~/ui/icons/Plus";
import SwitchInput from "~/ui/inputs/Switch";
import ChevronUpIcon from "~/ui/icons/ChevronUp";
import ChevronDownIcon from "~/ui/icons/ChevronDown";

interface Props {
  value?: Partial<Variant[]>;
  error?: FieldError;
  base?: number;
  onChange: (options: Variant[]) => void;
}

const ProductVariantsInput: React.FC<Props> = ({value = [], error: _error, base = 0, onChange}) => {
  const [active, setActive] = React.useState(null);
  const error = React.useMemo(() => {
    if (!_error) return null;

    const [index, type, ...message] = (_error.message as string).split("|");

    return {index: Number(index), type, message: message.join("|")};
  }, [_error]);

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
        const variantError = error?.index === index ? error : null;

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
                error={variantError?.type === "title" && error.message}
                flex={1}
                help="Utilizá solo 1 palabra. Se mostrará: Eligir color"
              >
                <ClearableTextField
                  placeholder="Adicionales"
                  value={option.title}
                  onChange={(event) => handleTitleChange(index, event.target.value)}
                  onClear={() => handleRemove(index)}
                />
              </FormControl>
              <IconButton leftIcon={ChevronUpIcon} onClick={() => setActive(null)} />
            </Stack>
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
              base={base}
              error={variantError}
              index={index}
              value={option}
              onChange={(value) => handleChange(index, value)}
            />
          </Stack>
        ) : (
          <IconButton
            key={option.id}
            borderColor={variantError ? "red.500" : "transparent"}
            borderWidth={variantError ? 2 : 0}
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
        onClick={handleAddVariant}
      >
        Agregar variante
      </IconButton>
    </Stack>
  );
};

export default ProductVariantsInput;
