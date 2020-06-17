import React from "react";
import {Input as ChakraInput, InputProps} from "@chakra-ui/core";

const Input: React.FC<InputProps> = React.forwardRef((props, ref) => (
  <ChakraInput
    ref={ref}
    focusBorderColor="primary.300"
    fontSize={{base: "sm", sm: "md"}}
    paddingX={2}
    variant="filled"
    {...props}
  />
));

export default Input;
