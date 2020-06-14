import {FormLabel as ChakraFormLabel, Text, BoxProps} from "@chakra-ui/core";
import React from "react";

interface Props extends BoxProps {
  isRequired?: boolean;
  name?: string;
  note?: string;
}

const FormLabel: React.FC<Props> = ({isRequired, name, children, note, ...props}) => (
  <ChakraFormLabel alignItems="center" display="flex" htmlFor={name} {...props}>
    <Text fontWeight={500}>{children}</Text>
    {note && (
      <Text color="gray.400" marginLeft={2}>
        {note}
      </Text>
    )}
    {isRequired ? (
      <Text
        alignSelf="flex-start"
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
  </ChakraFormLabel>
);

export default FormLabel;
