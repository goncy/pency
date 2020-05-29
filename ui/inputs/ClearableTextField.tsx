import React from "react";
import {
  InputGroup,
  InputRightElement,
  CloseButton,
  InputGroupProps,
  InputProps,
} from "@chakra-ui/core";

import Input from "./Input";

interface Props extends Omit<InputGroupProps, "children"> {
  name?: InputProps["name"];
  placeholder?: InputProps["placeholder"];
  variant?: InputProps["variant"];
  value?: InputProps["value"];
  onChange?: InputProps["onChange"];
  onClear?: VoidFunction;
}

const ClearableTextField: React.FC<Props> = React.forwardRef(
  ({name, placeholder, onChange, value, onClear, ...props}, ref) => (
    <InputGroup {...props}>
      <Input
        ref={ref}
        name={name}
        paddingRight={10}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InputRightElement backgroundColor="transparent">
        <CloseButton onClick={onClear} />
      </InputRightElement>
    </InputGroup>
  ),
);

export default ClearableTextField;
