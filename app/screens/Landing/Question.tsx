import React from "react";
import {Stack, Text} from "@chakra-ui/core";

interface Props {
  title: string;
}

const Question: React.FC<Props> = ({children, title}) => (
  <Stack
    borderBottomColor="gray.400"
    borderBottomWidth={1}
    paddingBottom={12}
    spacing={4}
    textAlign="left"
  >
    <Text color="gray.900" fontSize="xl" fontWeight={500}>
      {title}
    </Text>
    <Text color="gray.700" fontSize="lg">
      {children}
    </Text>
  </Stack>
);

export default Question;
