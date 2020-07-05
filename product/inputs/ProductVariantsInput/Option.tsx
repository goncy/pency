import React from "react";
import {Stack, FormLabel, FormHelperText, Divider, CloseButton, Flex} from "@chakra-ui/core";
import produce from "immer";

import {Variant} from "../../types";

import {getOption} from "./constants";

import Input from "~/ui/inputs/Input";
import FormControl from "~/ui/form/FormControl";
import PlusIcon from "~/ui/icons/Plus";
import IconButton from "~/ui/controls/IconButton";
import Price from "~/ui/inputs/Price";

interface Props {
  index: number;
  base: number;
  error?: {
    index: number;
    type: string;
    message: string;
  };
  value: Partial<Variant>;
  onChange: (option: Partial<Variant>) => void;
}

const OptionInput: React.FC<Props> = ({error: _error, value, onChange, base = 0}) => {
  const error = React.useMemo(() => {
    if (!_error) return null;

    const [index, message] = _error.message.split("|");

    return {
      type: _error.type,
      index: Number(index),
      message,
    };
  }, [_error]);

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
          <FormLabel fontSize={{base: "sm", sm: "md"}} fontWeight={500} marginBottom={0}>
            Opciones
          </FormLabel>
        )}
        <Stack spacing={2}>
          {value.options.map((option, subindex) => {
            const optionError = error?.index === subindex ? error : null;

            return (
              <Stack key={option.id} spacing={0}>
                <Stack isInline alignItems="flex-start" spacing={0}>
                  <FormControl
                    error={optionError?.type === "optionsTitle" && optionError.message}
                    width="100%"
                  >
                    <Input
                      placeholder="Queso cheddar"
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
                  <FormControl
                    error={optionError?.type === "optionsPrice" && optionError.message}
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
                        style={{marginLeft: "-1px"}}
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
                {value.count === 1 && option.price && (
                  <FormHelperText>
                    Precio del producto + opción = ${Number(option.price) + Number(base)}
                  </FormHelperText>
                )}
              </Stack>
            );
          })}
        </Stack>
        <FormHelperText>El precio de la opción se le sumará al valor del producto.</FormHelperText>
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

export default OptionInput;
