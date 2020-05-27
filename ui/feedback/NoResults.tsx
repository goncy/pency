import React from "react";
import {Flex, Icon, Text, FlexProps} from "@chakra-ui/core";

const NoResults: React.FC<FlexProps> = ({children, ...props}) => (
  <Flex
    alignItems="center"
    direction="column"
    flex={1}
    justifyContent="center"
    marginTop={12}
    style={{marginBottom: 12}}
    {...props}
  >
    <Icon color="gray.200" fontSize={{base: 64, sm: 96}} marginBottom={4} name="search" />
    {children && (
      <Text color="gray.300" fontSize={{base: "md", sm: "lg"}} textAlign="center">
        {children}
      </Text>
    )}
  </Flex>
);

export default NoResults;
