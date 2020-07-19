import React from "react";
import {
  FormControl as ChakraFormControl,
  FormHelperText,
  FormErrorMessage,
  FormControlProps,
  Stack,
} from "@chakra-ui/core";

import FormLabel from "./FormLabel";

interface Props extends FormControlProps {
  error?: string | React.ReactNode;
  name?: string;
  help?: string;
  label?: string;
  note?: string;
  info?: string | React.ReactNode;
}

const FormControl: React.FC<Props> = ({
  error,
  name,
  label,
  help,
  note,
  children,
  info,
  isRequired,
  ...props
}) => {
  return (
    <ChakraFormControl isInvalid={Boolean(error)} {...props}>
      {label && (
        <Stack isInline alignItems="center" paddingBottom={1} spacing={1}>
          <FormLabel info={info} isRequired={isRequired} name={name} note={note} padding={0}>
            {label}
          </FormLabel>
        </Stack>
      )}
      {children}
      {help && !error && <FormHelperText>{help}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </ChakraFormControl>
  );
};

export default FormControl;
