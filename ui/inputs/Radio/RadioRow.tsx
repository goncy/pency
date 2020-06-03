import React from "react";
import {Radio as ChakraRadio, RadioProps as ChakraRadioProps, Stack, Text} from "@chakra-ui/core";
import styled from "@emotion/styled";

const StyledRadio = styled(ChakraRadio)`
  [type="radio"] {
    background: white;
  }
`;

interface Props extends ChakraRadioProps {
  note?: string;
}

const RadioRow: React.FC<Props> = ({children, note = null, ...props}) => (
  <StyledRadio
    isFullWidth
    borderBottomWidth={1}
    paddingBottom={4}
    paddingTop={2}
    paddingX={0}
    rounded="md"
    size="lg"
    width="100%"
    {...props}
  >
    <Stack isInline alignItems="center" justifyContent="space-between" width="100%">
      <Text fontSize={{base: "sm", sm: "md"}} fontWeight={300}>
        {children}
      </Text>
      {note && (
        <Text color="gray.400" fontSize={{base: "13px", sm: "sm"}} fontWeight={500}>
          {note}
        </Text>
      )}
    </Stack>
  </StyledRadio>
);

export default RadioRow;
