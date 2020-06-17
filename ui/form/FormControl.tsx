import React from "react";
import {
  FormControl as ChakraFormControl,
  FormHelperText,
  FormErrorMessage,
  FormControlProps,
} from "@chakra-ui/core";

import FormLabel from "./FormLabel";

interface Props extends FormControlProps {
  error?: string | React.ReactNode;
  name?: string;
  help?: string;
  label?: string;
  note?: string;
}

const FormControl: React.FC<Props> = ({
  error,
  name,
  label,
  help,
  note,
  children,
  isRequired,
  ...props
}) => (
  <ChakraFormControl isInvalid={Boolean(error)} {...props}>
    {label && (
      <FormLabel isRequired={isRequired} name={name} note={note}>
        {label}
      </FormLabel>
    )}
    {children}
    {help && !error && <FormHelperText>{help}</FormHelperText>}
    <FormErrorMessage>{error}</FormErrorMessage>
  </ChakraFormControl>
);

export default FormControl;
