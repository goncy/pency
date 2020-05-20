import {log} from "util";

import React from "react";
import {Text, Radio, RadioGroup} from "@chakra-ui/core";
import styled from "@emotion/styled";

import {SingleOptionItem} from "../types/options";

interface Props {
  options: Props["value"][];
  valueProp?: string;
  value?: SingleOptionItem;
  onChange: (value: Props["value"]) => void;
}

const Price = styled(Text)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const ProductRadioInput: React.FC<Props> = ({options, value, valueProp, onChange, ...props}) => {
  const selectedOptionIndex = value && options.findIndex((option) => option.id === value.id);

  return (
    <RadioGroup
      spacing={0}
      value={`${selectedOptionIndex}`}
      onChange={(e) => {
        const selectedOptionIndex = Number(e.target.value);
        return onChange(options[selectedOptionIndex]);
      }}
      {...props}
    >
      {options.map((option, index) => {
        return (
          <Radio
            key={option[valueProp]}
            alignItems="center"
            borderBottomWidth={1}
            display="flex"
            isChecked={selectedOptionIndex === index}
            isFullWidth={true}
            position="relative"
            py={3}
            value={`${index}`}
            w="full"
          >
            <Text>{option.title}</Text>
            {!!option.price && (
              <Price color="gray.500" fontSize="sm" fontWeight="medium">
                + ${option.price}
              </Price>
            )}
          </Radio>
        );
      })}
    </RadioGroup>
  );
};

export default ProductRadioInput;
