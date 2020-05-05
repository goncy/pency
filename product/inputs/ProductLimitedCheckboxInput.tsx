import React from "react";
import {SimpleGrid} from "@chakra-ui/core";

import {MultipleOptionItem} from "../types/options";

import Checkbox from "~/ui/inputs/Checkbox";

interface Props {
  options: Props["value"];
  label?: (value: MultipleOptionItem) => string;
  valueProp?: string;
  value?: MultipleOptionItem[];
  limit?: number;
  onChange: (value: Props["value"]) => void;
}

const ProductLimitedCheckboxInput: React.FC<Props> = ({
  limit,
  value,
  options,
  label,
  valueProp = "value",
  onChange,
  ...props
}) => {
  const isFull = value?.length >= limit;

  function handleChange(option, checked) {
    const filtered = value?.length
      ? value.filter((selected) => selected[valueProp] !== option[valueProp])
      : [];

    onChange(checked ? filtered.concat(option) : filtered);
  }

  return (
    <SimpleGrid spacing={3} width="100%" {...props}>
      {options.map((option) => {
        const isSelected = Boolean(
          value?.find((selected) => selected[valueProp] === option[valueProp]),
        );
        const isDisabled = isFull && !isSelected;

        return (
          <Checkbox
            key={option[valueProp]}
            isChecked={isSelected}
            isDisabled={isDisabled}
            onChange={(isSelected) => handleChange(option, isSelected)}
          >
            {label(option)}
          </Checkbox>
        );
      })}
    </SimpleGrid>
  );
};

export default ProductLimitedCheckboxInput;
