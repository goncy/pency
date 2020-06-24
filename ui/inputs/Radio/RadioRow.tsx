import React from "react";
import {Radio as ChakraRadio, RadioProps as ChakraRadioProps, Stack, Text} from "@chakra-ui/core";
import styled from "@emotion/styled";

const StyledRadio = styled(ChakraRadio)`
  [type="radio"] {
    background: white;
    width: 24px;
    height: 24px;
  }
`;

interface Props extends ChakraRadioProps {
  note?: string;
}

const RadioRow: React.FC<Props> = ({children, note = null, ...props}) => (
  <StyledRadio
    isFullWidth
    borderBottomWidth={1}
    height="auto"
    minHeight={12}
    paddingBottom={4}
    paddingX={0}
    paddingY={2}
    rounded="md"
    size="lg"
    width="100%"
    {...props}
  >
    <Stack isInline alignItems="center" justifyContent="space-between" width="100%">
      <Text fontSize="md" fontWeight="normal">
        {children}
      </Text>
      {note && (
        <Text color="gray.400" fontSize={{base: "15px", sm: "sm"}} fontWeight={500}>
          {note}
        </Text>
      )}
    </Stack>
  </StyledRadio>
);

export default RadioRow;
