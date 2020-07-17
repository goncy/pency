import {FormLabel as ChakraFormLabel, Text, BoxProps, Collapse, Stack} from "@chakra-ui/core";
import React from "react";

import HelpCircleIcon from "../icons/HelpCircle";

interface Props extends BoxProps {
  isRequired?: boolean;
  name?: string;
  note?: string;
  info?: string | React.ReactNode;
}

const FormLabel: React.FC<Props> = ({isRequired, name, children, note, info, ...props}) => {
  const [isInfoOpen, toggleInfo] = React.useState(false);

  function handleToggleInfo() {
    toggleInfo(!isInfoOpen);
  }

  return (
    <Stack>
      <ChakraFormLabel alignItems="center" display="flex" htmlFor={name} {...props}>
        <Text fontWeight={500}>{children}</Text>
        {note && (
          <Text color="gray.400" marginLeft={2}>
            {note}
          </Text>
        )}
        {info && (
          <HelpCircleIcon
            color="gray.600"
            cursor="pointer"
            marginLeft={1}
            size={16}
            onClick={handleToggleInfo}
          />
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
    </Stack>
  );
};

export default FormLabel;
