import React from "react";
import {Stack, Text, Code} from "@chakra-ui/core";

const Info: React.FC = () => (
  <Stack spacing={2}>
    <Text>El código de seguimiento de Google Analytics se ve algo así:</Text>
    <Code>UA-XXXXXXXXX-X</Code>
  </Stack>
);

export default Info;
