import React from "react";
import {Box, Text, Stack, BoxProps} from "@chakra-ui/core";

interface Props {
  title: string;
  icon: React.ComponentType<BoxProps>;
}

const Feature: React.FC<Props> = ({title, children, icon}) => (
  <Stack as="article" spacing={2}>
    <Box color="teal.500">{React.createElement(icon, {size: 40})}</Box>
    <Text as="h3" color="teal.800" fontSize={{base: "xl", sm: "lg"}} fontWeight={500}>
      {title}
    </Text>
    <Text color="gray.500" fontSize="lg">
      {children}
    </Text>
  </Stack>
);

export default Feature;
