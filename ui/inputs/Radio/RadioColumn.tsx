import React from "react";
import {Radio as ChakraRadio, RadioProps as ChakraRadioProps} from "@chakra-ui/core";
import styled from "@emotion/styled";

const StyledRadio = styled(ChakraRadio)`
  [type="radio"] {
    background: white;
  }
`;

const RadioColumn: React.FC<ChakraRadioProps> = (props) => (
  <StyledRadio backgroundColor="gray.100" padding={2} rounded="md" width="100%" {...props} />
);

export default RadioColumn;
