import React from "react";
import produce from "immer";
import {Stack, FormHelperText, FormLabel, Divider, Flex, CloseButton} from "@chakra-ui/core";

import {RadioField} from "../../../types";
import {getRadioOption} from "../constants";

import PlusIcon from "~/ui/icons/Plus";
import FormControl from "~/ui/controls/FormControl";
import IconButton from "~/ui/controls/IconButton";
import Input from "~/ui/inputs/Input";

interface Props {
  value: Partial<RadioField>;
  onChange: (value: Partial<RadioField>) => void;
  error?: string;
}

const RadioFieldInput: React.FC<Props> = ({value, onChange, error}) => {
  function handleChange(subindex, prop, newValue) {
    onChange(
      produce(value, (value) => {
        value.options[subindex][prop] = newValue;
      }),
    );
  }

  function handleRemove(subindex) {
    onChange(
      produce(value, (value) => {
        value.options.splice(subindex, 1);
      }),
    );
  }

  function handleAdd() {
    onChange(
      produce(value, (value) => {
        value.options.push(getRadioOption());
      }),
    );
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={0}>
        {value.options.length && (
          <FormLabel fontSize="sm" marginBottom={0}>
            Opciones
          </FormLabel>
        )}
        <Stack spacing={2}>
          {value.options.map((option, subindex) => (
            <Stack key={option.id} isInline alignItems="flex-start" spacing={0}>
              <FormControl
                error={error === "radioOptionsTitle" && !option.title && "Este campo es requerido"}
                width="100%"
              >
                <Input
                  placeholder="Efectivo"
                  roundedRight={0}
                  value={option.title}
                  onChange={(event) => handleChange(subindex, "title", event.target.value)}
                />
              </FormControl>
              <Divider
                borderColor="gray.400"
                height={6}
                marginX={0}
                marginY={2}
                orientation="vertical"
                style={{marginLeft: "-1px"}}
              />
              <FormControl flexShrink={2} width="100%">
                <Input
                  maxLength={35}
                  placeholder="Nota"
                  rounded={0}
                  value={option.note}
                  onChange={(event) => handleChange(subindex, "note", event.target.value || "")}
                />
              </FormControl>
              {value.options.length > 2 && (
                <Flex backgroundColor="gray.100" roundedRight="md">
                  <Divider
                    borderColor="gray.400"
                    height={6}
                    marginX={0}
                    marginY={2}
                    orientation="vertical"
                  />
                  <CloseButton
                    aria-label="Borrar sub opción"
                    height={10}
                    roundedLeft={0}
                    width={10}
                    onClick={() => handleRemove(subindex)}
                  />
                </Flex>
              )}
            </Stack>
          ))}
        </Stack>
        <FormHelperText>La nota tiene un máximo de 35 caracteres</FormHelperText>
      </Stack>
      <IconButton
        _hover={{
          color: "primary.600",
        }}
        color="primary.500"
        fontWeight="normal"
        justifyContent="flex-start"
        leftIcon={PlusIcon}
        variant="unstyled"
        onClick={handleAdd}
      >
        Agregar opción
      </IconButton>
    </Stack>
  );
};

export default RadioFieldInput;
