import React from "react";
import {
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps as ChakraRadioGroupProps,
} from "@chakra-ui/core";
import styled from "@emotion/styled";

const StyledRadioGroup = styled(ChakraRadioGroup)`
  & > div {
    width: 100%;
  }
`;

const RadioGroup: React.FC<ChakraRadioGroupProps> = (props) => (
  <StyledRadioGroup isInline display="flex" {...props} />
);

export default RadioGroup;
