import React from "react";
import {Stack, Checkbox} from "@chakra-ui/core";

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
    <Stack {...props}>
      {options.map((option) => {
        const isSelected = Boolean(
          value?.find((selected) => selected[valueProp] === option[valueProp]),
        );

        return (
          <Checkbox
            key={option[valueProp]}
            isDisabled={isFull && !isSelected}
            value={option[valueProp]}
            variantColor="primary"
            onChange={(event) => handleChange(option, event.target.checked)}
          >
            {option[labelProp]}
          </Checkbox>
        );
      })}
    </Stack>
  );
};

export default MultipleOptionsInput;
