import React from "react";
import {
  FormControl as ChakraFormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormControlProps,
} from "@chakra-ui/core";

interface Props extends FormControlProps {
  error?: string | React.ReactNode;
  name?: string;
  help?: string;
  label?: string;
}

const FormControl: React.FC<Props> = ({error, name, label, help, children, ...props}) => (
  <ChakraFormControl isInvalid={Boolean(error)} {...props}>
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    {children}
    {help && !error && <FormHelperText>{help}</FormHelperText>}
    <FormErrorMessage>{error}</FormErrorMessage>
  </ChakraFormControl>
);

export default FormControl;
