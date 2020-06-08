import React from "react";
import {Box, Text, Stack} from "@chakra-ui/core";

interface Props {
  title: string;
  icon: React.ComponentType;
}

const Feature: React.FC<Props> = ({title, children, icon}) => (
  <Stack as="article" spacing={2}>
    <Box>{React.createElement(icon)}</Box>
    <Text color="teal.800" fontSize={{base: "xl", sm: "lg"}} fontWeight={500}>
      {title}
    </Text>
    <Text color="gray.500" fontSize="lg">
      {children}
    </Text>
  </Stack>
);

export default Feature;
