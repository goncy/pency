import React from "react";
import {Stack, Input, FormLabel, FormHelperText, Divider, CloseButton, Flex} from "@chakra-ui/core";
import produce from "immer";

import {Variant} from "../../types/options";

import {getOption} from "./constants";

import FormControl from "~/ui/controls/FormControl";
import PlusIcon from "~/ui/icons/Plus";
import IconButton from "~/ui/controls/IconButton";
import Price from "~/ui/inputs/Price";

interface Props {
  index: number;
  error?: string;
  value: Partial<Variant>;
  onChange: (option: Partial<Variant>) => void;
}

const OptionInput: React.FC<Props> = ({error, value, onChange}) => {
  function handleChange(subindex, prop, newValue) {
    onChange(
      produce(value, (value) => {
        value.options[subindex][prop] = newValue;
      }),
    );
  }

  function handleAdd() {
    onChange(
      produce(value, (value) => {
        value.options.push(getOption());
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
                error={error === "optionsTitle" && !option.title && "Este campo es requerido"}
                width="100%"
              >
                <Input
                  autoFocus
                  placeholder="Queso cheddar"
                  roundedRight={0}
                  value={option.title}
                  variant="filled"
                  onChange={(event) => handleChange(subindex, "title", event.target.value)}
                />
              </FormControl>
              <Divider
                borderColor="gray.400"
                height={6}
                marginX={0}
                marginY={2}
                orientation="vertical"
              />
              <FormControl
                error={
                  error === "optionsPrice" &&
                  isNaN(Number(option.price)) &&
                  "Este campo es requerido"
                }
                flexShrink={2}
                width="100%"
              >
                <Price
                  placeholder="Precio"
                  rounded={0}
                  value={option.price}
                  onChange={(event) =>
                    handleChange(
                      subindex,
                      "price",
                      event.target.value ? Number(event.target.value) : "",
                    )
                  }
                />
              </FormControl>
              {value.options.length > 2 && value.options.length > value.count && (
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
        <FormHelperText>
          El precio que ingreses a la opción se sumará al valor base del producto.
        </FormHelperText>
      </Stack>
      <IconButton
        fontWeight="normal"
        justifyContent="flex-start"
        leftIcon={PlusIcon}
        marginBottom={3}
        paddingY={2}
        variant="link"
        variantColor="primary"
        onClick={handleAdd}
      >
        Agregar opción
      </IconButton>
    </Stack>
  );
};

export default OptionInput;
