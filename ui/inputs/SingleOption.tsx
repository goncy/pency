import React from "react";
import {Stack, Radio} from "@chakra-ui/core";

import {SingleOptionItem} from "~/product/types";

interface Props {
  options: SingleOptionItem[];
  labelProp?: string;
  valueProp?: string;
  value?: SingleOptionItem;
  onChange: (value: SingleOptionItem) => void;
}

const SingleOptionInput: React.FC<Props> = ({
  options,
  value,
  labelProp = "label",
  valueProp = "value",
  onChange,
  ...props
}) => {
  return (
    <Stack {...props}>
      {options.map((option) => (
        <Radio
          key={option[valueProp]}
          isChecked={Boolean(value && value[valueProp] === option[valueProp])}
          variantColor="primary"
          onChange={() => onChange(option)}
        >
          {option[labelProp]}
        </Radio>
      ))}
    </Stack>
  );
};

export default SingleOptionInput;
