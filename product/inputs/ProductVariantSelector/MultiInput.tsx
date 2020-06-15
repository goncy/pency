import React from "react";
import {Text, Stack} from "@chakra-ui/core";
import produce from "immer";

import {Option} from "../../types";

import Stepper from "~/ui/inputs/Stepper";

interface Props {
  options: Props["value"];
  value?: Option[];
  limit: number;
  onChange: (value: Props["value"]) => void;
}

const MultiInput: React.FC<Props> = ({limit, options, onChange, value = [], ...props}) => {
  const isFull = limit ? value?.length >= limit : false;

  function handleDecrease(option: Option) {
    const index = value.findIndex((selected) => selected.id === option.id);

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
        const count = value?.filter((selected) => selected.id === option.id).length;

        return (
          <Stack
            key={option.id}
            isInline
            alignItems="center"
            borderBottomWidth={1}
            cursor={isFull ? "not-allowed" : "pointer"}
            height={12}
            justifyContent="space-between"
            paddingY={2}
            userSelect="none"
            onClick={() => !isFull && handleIncrease(option)}
          >
            <Stack isInline shouldWrapChildren spacing={2}>
              <Stepper
                max={isFull ? count : limit || undefined}
                min={0}
                value={count}
                onDecrease={() => handleDecrease(option)}
                onIncrease={() => handleIncrease(option)}
              />
              <Text
                color={isFull ? (count ? "black" : "gray.400") : "black"}
                fontWeight={count ? 500 : "normal"}
              >
                {option.title}
              </Text>
            </Stack>
            {Boolean(option.price) && (
              <Text color="gray.400" fontSize={{base: "15px", sm: "sm"}} fontWeight={500}>
                + ${option.price}
              </Text>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MultiInput;
