import React from "react";
import {
  InputGroup,
  InputRightElement,
  CloseButton,
  Input,
  InputGroupProps,
  InputProps,
} from "@chakra-ui/core";

interface Props extends Omit<InputGroupProps, "children"> {
  name?: InputProps["name"];
  placeholder?: InputProps["placeholder"];
  variant?: InputProps["variant"];
  value?: InputProps["value"];
  onChange?: InputProps["onChange"];
  autoFocus?: InputProps["autoFocus"];
  onClear?: VoidFunction;
}

const ClearableTextField: React.FC<Props> = React.forwardRef(
  ({name, placeholder, onChange, value, onClear, autoFocus, ...props}, ref) => (
    <InputGroup {...props}>
      <Input
        ref={ref}
        autoFocus={autoFocus}
        name={name}
        paddingRight={10}
        placeholder={placeholder}
        value={value}
        variant="filled"
        onChange={onChange}
      />
      <InputRightElement backgroundColor="transparent">
        <CloseButton onClick={onClear} />
      </InputRightElement>
    </InputGroup>
  ),
);

export default ClearableTextField;
