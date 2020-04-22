import React from "react";
import {SimpleGrid} from "@chakra-ui/core";

import Checkbox from "./Checkbox";

import {MultipleOptionItem} from "~/product/types";

interface Props {
  options: MultipleOptionItem[];
  labelProp?: string;
  valueProp?: string;
  value?: MultipleOptionItem[];
  limit?: number;
  onChange: (value: MultipleOptionItem[]) => void;
}

const MultipleOptionsInput: React.FC<Props> = ({
  limit,
  value,
  options,
  labelProp = "label",
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
            {option[labelProp]}
          </Checkbox>
        );
      })}
    </SimpleGrid>
  );
};

export default MultipleOptionsInput;
