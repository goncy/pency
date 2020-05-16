import React from "react";
import {Stack, Icon, Text} from "@chakra-ui/core";

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
  onChange,
  valueProp = "value",
  ...props
}) => (
  <Stack shouldWrapChildren spacing={3} width="100%" {...props}>
    {options.map((option) => {
      const isChecked = Boolean(value && value[valueProp] === option[valueProp]);

      return (
        <Checkbox key={option[valueProp]} isChecked={isChecked} onChange={() => onChange(option)}>
          <Text>{label(option)}</Text>
          {isChecked && <Icon color="primary.500" marginLeft={2} name="check-circle" />}
        </Checkbox>
      );
    })}
  </Stack>
);

export default ProductRadioInput;
