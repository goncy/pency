import React from "react";
import {
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";

interface Props {
  value?: any;
  onChange: () => void;
}

const ProductQuantitityInput: React.FC<Props> = ({value, onChange}) => {
  return (
    <NumberInput max={99} min={1} value={value} width="32" onChange={onChange}>
      <NumberInputField px="10" textAlign="center" />
      <NumberInputStepper w="100%">
        <NumberIncrementStepper
          children={
            <IconButton
              aria-label="Agregar uno a la cantidad"
              icon="add"
              size="sm"
              variant="ghost"
            />
          }
          borderLeft="none"
          marginRight="6px"
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
        />
        <NumberDecrementStepper
          children={
            <IconButton
              aria-label="Restar uno a la cantidad"
              icon="minus"
              size="sm"
              variant="ghost"
            />
          }
          border="none"
          borderLeft="none"
          left={0}
          marginLeft="6px"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
        />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default ProductQuantitityInput;
