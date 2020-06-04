import React from "react";
import {Text, Stack, IconButton} from "@chakra-ui/core";
import produce from "immer";

import {Option} from "../types";

import Checkbox from "~/ui/inputs/Checkbox";

interface Props {
  options: Props["value"];
  valueProp?: string;
  value?: Option[];
  limit: number;
  onChange: (value: Props["value"]) => void;
}

const ProductLimitedCheckboxInput: React.FC<Props> = ({
  limit,
  options,
  onChange,
  valueProp = "value",
  value = [],
  ...props
}) => {
  const isFull = limit ? value?.length >= limit : false;

  function handleDecrease(option) {
    const index = value.findIndex((selected) => selected[valueProp] === option[valueProp]);

    onChange(
      produce(value, (value) => {
        value.splice(index, 1);
      }),
    );
  }

  function handleIncrease(option) {
    onChange(value.concat(option));
  }

  return (
    <Stack shouldWrapChildren spacing={0} width="100%" {...props}>
      {options.map((option) => {
        const count = value?.filter((selected) => selected[valueProp] === option[valueProp]).length;
        const isDisabled = isFull && !count;

        return (
          <Checkbox
            key={option[valueProp]}
            isReadOnly
            isChecked={Boolean(count)}
            isDisabled={isDisabled}
          >
            <Stack isInline mr={2}>
              {!!count && (
                <>
                  <IconButton
                    aria-label="Sumar uno a la opción"
                    borderRadius="full"
                    fontSize="xs"
                    icon="minus"
                    isDisabled={count === 0}
                    size="sm"
                    onClick={() => handleDecrease(option)}
                  />
                  <Text alignSelf="center" minWidth={6} textAlign="center">
                    {count}
                  </Text>
                </>
              )}
              <IconButton
                aria-label="Restar uno a la opción"
                borderRadius="full"
                fontSize="xs"
                icon="add"
                isDisabled={isFull}
                size="sm"
                onClick={() => handleIncrease(option)}
              />
            </Stack>
            <Text>{option.title}</Text>
            {!!option.price && (
              <Text
                color="gray.500"
                fontWeight="medium"
                marginLeft="auto"
                pl={2}
                whiteSpace="nowrap"
              >
                + ${option.price}
              </Text>
            )}
          </Checkbox>
        );
      })}
    </Stack>
  );
};

export default ProductLimitedCheckboxInput;
