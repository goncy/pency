import React from "react";
import {Textarea as ChakraTextarea, InputProps} from "@chakra-ui/core";

const Textarea: React.FC<InputProps> = React.forwardRef((props, ref) => (
  <ChakraTextarea
    ref={ref}
    focusBorderColor="primary.300"
    paddingX={2}
    variant="filled"
    {...props}
  />
));

export default Textarea;
