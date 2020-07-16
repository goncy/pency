import React from "react";
import {
  FormControl as ChakraFormControl,
  FormHelperText,
  FormErrorMessage,
  FormControlProps,
  Collapse,
  Stack,
  Text,
} from "@chakra-ui/core";

import HelpCircleIcon from "../icons/HelpCircle";

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
  const [isInfoOpen, toggleInfo] = React.useState(false);

  function handleToggleInfo() {
    toggleInfo(!isInfoOpen);
  }

  return (
    <ChakraFormControl isInvalid={Boolean(error)} {...props}>
      {label && (
        <FormLabel isRequired={isRequired} name={name} note={note}>
          <Stack isInline alignItems="center" spacing={1}>
            <Text>{label}</Text>
            {info && (
              <HelpCircleIcon
                color="gray.600"
                cursor="pointer"
                size={16}
                onClick={handleToggleInfo}
              />
            )}
          </Stack>
        </FormLabel>
      )}
      {info && (
        <Collapse
          backgroundColor="gray.50"
          fontSize="sm"
          isOpen={isInfoOpen}
          marginBottom={2}
          padding={2}
          rounded="md"
          whiteSpace="pre-line"
        >
          {info}
        </Collapse>
      )}
      {children}
      {help && !error && <FormHelperText>{help}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </ChakraFormControl>
  );
};

export default FormControl;
