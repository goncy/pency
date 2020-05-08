import React from "react";
import {Flex, Icon, Text, IconProps, FlexProps} from "@chakra-ui/core";

interface Props extends FlexProps {
  icon: IconProps["name"];
}

const Empty: React.FC<Props> = ({children, icon, ...props}) => (
  <Flex alignItems="center" direction="column" flex={1} justifyContent="center" {...props}>
    <Icon color="gray.200" mb={4} name={icon} size="128px" />
    <Text color="gray.500" fontSize="lg" textAlign="center">
      {children}
    </Text>
  </Flex>
);

export default Empty;
