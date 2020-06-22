import React from "react";
import {Stack, Text, IconButton, StackProps} from "@chakra-ui/core";
import styled from "@emotion/styled";

const RoundButton = styled(IconButton)`
  svg {
    width: 10px;
    height: 10px;
  }
`;

interface Props extends Omit<StackProps, "value" | "onChange"> {
  value?: number;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
}

const Stepper: React.FC<Props> = ({
  value,
  onDecrease,
  onIncrease,
  onChange,
  min,
  max,
  ...props
}) => {
  const isMinDisabled = min === undefined ? false : value <= min;
  const isMaxDisabled = max === undefined ? false : value >= max;

  function handleDecrease(event: React.MouseEvent) {
    event.stopPropagation();

    onDecrease && onDecrease(value - 1);
    onChange && onChange(value - 1);
  }

  function handleIncrease(event: React.MouseEvent) {
    event.stopPropagation();

    onIncrease && onIncrease(value + 1);
    onChange && onChange(value + 1);
  }

  return (
    <Stack isInline alignItems="center" rounded="lg" spacing={0} width="auto" {...props}>
      {value && (
        <RoundButton
          isRound
          aria-label="restar"
          borderWidth={value ? "inherit" : 2}
          color={value ? "white" : "gray.400"}
          display="flex"
          height="24px"
          icon="minus"
          isDisabled={isMinDisabled}
          minHeight="24px"
          minWidth="24px"
          variant={value ? "solid" : "outline"}
          variantColor={value ? "primary" : "gray"}
          width="24px"
          onClick={handleDecrease}
        />
      )}
      {value && (
        <Text fontWeight={500} textAlign="center" width={6}>
          {value}
        </Text>
      )}
      <RoundButton
        isRound
        aria-label="sumar"
        borderWidth={value ? "inherit" : 2}
        color={value ? "white" : "gray.400"}
        display="flex"
        height="24px"
        icon="add"
        isDisabled={isMaxDisabled}
        minHeight="24px"
        minWidth="24px"
        variant={value ? "solid" : "outline"}
        variantColor={value ? "primary" : "gray"}
        width="24px"
        onClick={handleIncrease}
      />
    </Stack>
  );
};

export default Stepper;
