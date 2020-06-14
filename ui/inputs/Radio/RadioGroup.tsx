import React from "react";
import {
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps as ChakraRadioGroupProps,
} from "@chakra-ui/core";
import styled from "@emotion/styled";

const StyledRadioGroup = styled(ChakraRadioGroup)`
  & > div {
    width: 100%;

    & > label > div:last-of-type {
      width: 100%;
    }
  }
`;

const RadioGroup: React.FC<ChakraRadioGroupProps> = ({isInline, ...props}) => (
  <StyledRadioGroup
    display="flex"
    flexDirection={isInline ? "row" : "column"}
    isInline={isInline}
    size="lg"
    spacing={isInline ? 3 : 0}
    variantColor="primary"
    {...props}
  />
);

export default RadioGroup;
