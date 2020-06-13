import React from "react";
import {Stack, Text, IconButton} from "@chakra-ui/core";
import styled from "@emotion/styled";

const RoundButton = styled(IconButton)`
  svg {
    width: 8px;
    height: 8px;
  }
`;

interface Props {
  value?: number;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
}

const Stepper: React.FC<Props> = ({value, onDecrease, onIncrease, onChange, min, max}) => {
  const isMinDisabled = min === undefined ? false : value <= min;
  const isMaxDisabled = max === undefined ? false : value >= max;

  function handleDecrease() {
    onDecrease && onDecrease(value - 1);
    onChange && onChange(value - 1);
  }

  function handleIncrease() {
    onIncrease && onIncrease(value + 1);
    onChange && onChange(value + 1);
  }

  return (
    <Stack isInline alignItems="center" rounded="lg" spacing={0} width="auto">
      {value && (
        <RoundButton
          isRound
          aria-label="restar"
          borderWidth={value ? "inherit" : 2}
          color={value ? "white" : "gray.400"}
          display="flex"
          height="20px"
          icon="minus"
          isDisabled={isMinDisabled}
          minHeight="20px"
          minWidth="20px"
          variant={value ? "solid" : "outline"}
          variantColor={value ? "primary" : "gray"}
          width="20px"
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
        height="20px"
        icon="add"
        isDisabled={isMaxDisabled}
        minHeight="20px"
        minWidth="20px"
        variant={value ? "solid" : "outline"}
        variantColor={value ? "primary" : "gray"}
        width="20px"
        onClick={handleIncrease}
      />
    </Stack>
  );
};

export default Stepper;
