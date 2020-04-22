import React from "react";
import {Stack, Radio, SimpleGrid} from "@chakra-ui/core";

import Checkbox from "./Checkbox";

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

export default SingleOptionInput;
