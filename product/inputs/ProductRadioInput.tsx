import React from "react";
import {SimpleGrid} from "@chakra-ui/core";

import {SingleOptionItem} from "../types/options";

import Checkbox from "~/ui/inputs/Checkbox";

interface Props {
  options: Props["value"][];
  label?: (value: SingleOptionItem) => string;
  valueProp?: string;
  value?: SingleOptionItem;
  onChange: (value: Props["value"]) => void;
}

const ProductRadioInput: React.FC<Props> = ({
  options,
  value,
  label,
  valueProp = "value",
  onChange,
  ...props
}) => {
  return (
    <SimpleGrid spacing={3} width="100%" {...props}>
      {options.map((option) => (
        <Checkbox
          key={option[valueProp]}
          isChecked={Boolean(value && value[valueProp] === option[valueProp])}
          onChange={() => onChange(option)}
        >
          {label(option)}
        </Checkbox>
      ))}
    </SimpleGrid>
  );
};

export default ProductRadioInput;
