import React from "react";
import {InputGroup, InputLeftElement, InputGroupProps, InputProps} from "@chakra-ui/core";

import Input from "./Input";

interface Props extends Omit<InputGroupProps, "children" | "onChange"> {
  name?: InputProps["name"];
  placeholder?: InputProps["placeholder"];
  variant?: InputProps["variant"];
  value?: InputProps["value"];
  onChange?: InputProps["onChange"];
}

const Price: React.FC<Props> = React.forwardRef(
  ({name, value, placeholder, onChange, rounded, ...props}, ref) => (
    <InputGroup {...props}>
      <InputLeftElement
        children="$"
        backgroundColor="transparent"
        paddingX={0}
        pointerEvents="none"
        rounded={rounded}
      />
      <Input
        ref={ref}
        name={name}
        placeholder={placeholder}
        rounded={rounded}
        style={{paddingLeft: "2rem"}}
        type="number"
        value={value}
        variant="filled"
        onChange={(event) => onChange && onChange(event)}
      />
    </InputGroup>
  ),
);

export default Price;
