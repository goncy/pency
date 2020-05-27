import React from "react";
import {InputGroup, InputLeftElement, Input, InputGroupProps, InputProps} from "@chakra-ui/core";

interface Props extends Omit<InputGroupProps, "children"> {
  name?: InputProps["name"];
  placeholder?: InputProps["placeholder"];
  variant?: InputProps["variant"];
}

const Price: React.FC<Props> = React.forwardRef(({name, placeholder, ...props}, ref) => (
  <InputGroup {...props}>
    <InputLeftElement children="$" backgroundColor="transparent" paddingX={0} />
    <Input
      ref={ref}
      name={name}
      placeholder={placeholder}
      style={{paddingLeft: "2rem"}}
      type="number"
      variant="filled"
    />
  </InputGroup>
));

export default Price;
