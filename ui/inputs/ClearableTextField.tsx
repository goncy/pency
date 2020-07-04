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
  isReadOnly?: InputProps["isReadOnly"];
  isDisabled?: InputProps["isDisabled"];
  focusBorderColor?: InputProps["focusBorderColor"];
}

const ClearableTextField: React.FC<Props> = React.forwardRef(
  (
    {
      name,
      placeholder,
      onChange,
      value,
      onClear,
      isReadOnly,
      isDisabled,
      variant,
      focusBorderColor,
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup {...props}>
        <Input
          ref={ref}
          focusBorderColor={focusBorderColor}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          name={name}
          paddingRight={onClear ? 10 : "inherit"}
          placeholder={placeholder}
          value={value}
          variant={variant}
          onChange={onChange}
        />
        {onClear && (
          <InputRightElement backgroundColor="transparent">
            <CloseButton onClick={onClear} />
          </InputRightElement>
        )}
      </InputGroup>
    );
  },
);

export default ClearableTextField;
