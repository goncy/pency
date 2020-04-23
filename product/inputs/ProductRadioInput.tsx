import React from "react";
import {SimpleGrid} from "@chakra-ui/core";

import {SingleOptionItem} from "../types";

import Checkbox from "~/ui/inputs/Checkbox";

interface Props {
  options: Props["value"][];
  labelProp?: string;
  valueProp?: string;
  value?: SingleOptionItem;
  onChange: (value: Props["value"]) => void;
}

const ProductRadioInput: React.FC<Props> = ({
  options,
  value,
  labelProp = "label",
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
          {option[labelProp]}
        </Checkbox>
      ))}
    </SimpleGrid>
  );
};

export default ProductRadioInput;
