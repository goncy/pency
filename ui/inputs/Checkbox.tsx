import React from "react";
import {Box, Flex} from "@chakra-ui/core";

interface Props {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isChecked: boolean;
  onChange?: (boolean) => void;
}

const Checkbox: React.FC<Props> = ({onChange, isReadOnly, isDisabled, isChecked, children}) => (
  <Box
    borderBottomWidth="1px"
    cursor={isDisabled || isReadOnly ? "auto" : "pointer"}
    opacity={isDisabled ? 0.5 : 1}
    paddingY={3}
    pointerEvents={isDisabled ? "none" : "auto"}
    onClick={() => !isReadOnly && onChange(!isChecked)}
  >
    <Flex alignItems="center" justifyContent="flex-start">
      {children}
    </Flex>
  </Box>
);

export default Checkbox;
