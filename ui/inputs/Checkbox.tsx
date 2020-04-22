import React from "react";
import {Box, Flex, Icon, Text} from "@chakra-ui/core";

interface Props {
  isDisabled?: boolean;
  isChecked: boolean;
  onChange: (boolean) => void;
}

const Checkbox: React.FC<Props> = ({onChange, isDisabled, isChecked, children}) => (
  <Box
    backgroundColor={isDisabled ? "gray.100" : "inherit"}
    borderColor={isChecked ? "primary.500" : "gray.200"}
    borderWidth="1px"
    cursor={isDisabled ? "auto" : "pointer"}
    opacity={isDisabled ? 0.5 : 1}
    padding={3}
    pointerEvents={isDisabled ? "none" : "auto"}
    onClick={() => onChange(!isChecked)}
  >
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{children}</Text>
      {isChecked && <Icon color="primary.500" marginLeft={2} name="check-circle" />}
    </Flex>
  </Box>
);

export default Checkbox;
