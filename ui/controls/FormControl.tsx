import React from "react";
import {
  FormControl as ChakraFormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormControlProps,
  Text,
} from "@chakra-ui/core";

interface Props extends FormControlProps {
  error?: string | React.ReactNode;
  name?: string;
  help?: string;
  label?: string;
}

const FormControl: React.FC<Props> = ({
  error,
  name,
  label,
  help,
  children,
  isRequired,
  ...props
}) => (
  <ChakraFormControl isInvalid={Boolean(error)} {...props}>
    {label && (
      <FormLabel display="flex" htmlFor={name}>
        <Text fontSize={{base: "sm", sm: "md"}} fontWeight={500}>
          {label}
        </Text>
        {isRequired ? (
          <Text
            backgroundColor="primary.50"
            color="primary.500"
            height={3}
            lineHeight="0.5rem"
            marginLeft={1}
            marginTop={1}
            padding={1}
            rounded="sm"
          >
            *
          </Text>
        ) : null}
      </FormLabel>
    )}
    {children}
    {help && !error && <FormHelperText>{help}</FormHelperText>}
    <FormErrorMessage>{error}</FormErrorMessage>
  </ChakraFormControl>
);

export default FormControl;
