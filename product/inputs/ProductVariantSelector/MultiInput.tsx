import React from "react";
import {Text, Stack} from "@chakra-ui/core";
import produce from "immer";

import {Option, Variant} from "../../types";

import Stepper from "~/ui/inputs/Stepper";
import {usePrice} from "~/i18n/hooks";

interface Props {
  value?: Variant;
  limit: number;
  onChange: (value: Props["value"]) => void;
}

const MultiInput: React.FC<Props> = ({limit, onChange, value, ...props}) => {
  const isFull = limit ? value.value?.length >= limit : false;
  const p = usePrice();

  function handleDecrease(option: Option) {
    const index = value.value.findIndex((selected) => selected.id === option.id);

    onChange(
      produce(value, (value) => {
        if (!value?.value) {
          value.value = [];
        }

        value.value.splice(index, 1);
      }),
    );
  }

  function handleIncrease(option) {
    onChange({
      ...value,
      value: value?.value ? value.value.concat(option) : [option],
    });
  }

  return (
    <Stack shouldWrapChildren spacing={0} width="100%" {...props}>
      {value?.options?.map((option) => {
        const count = value?.value
          ? value.value.filter((selected) => selected.id === option.id).length
          : 0;

        return (
          <Stack
            key={option.id}
            isInline
            alignItems="center"
            borderBottomWidth={1}
            cursor={isFull ? "not-allowed" : "pointer"}
            height="auto"
            justifyContent="space-between"
            minHeight={12}
            paddingY={2}
            userSelect="none"
            onClick={() => !isFull && handleIncrease(option)}
          >
            <Stack isInline shouldWrapChildren alignItems="center" spacing={2}>
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
                + {p(option.price)}
              </Text>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MultiInput;
