import React from "react";
import {Stack, Text} from "@chakra-ui/core";

import Button from "~/ui/controls/Button";

interface Props {
  value?: number;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
}

const Stepper: React.FC<Props> = ({value, onChange, min = 0, max}) => (
  <Stack
    isInline
    alignItems="center"
    borderWidth={1}
    display="inline-flex"
    height={12}
    rounded="lg"
    spacing={0}
    width="auto"
  >
    <Button
      alignItems="center"
      display="flex"
      fontSize="xl"
      isDisabled={value <= min}
      justifyContent="center"
      minWidth="auto"
      variant="unstyled"
      width="36px"
      onClick={() => onChange(value - 1)}
    >
      -
    </Button>
    <Text fontWeight={500} textAlign="center" width={10}>
      {value}
    </Text>
    <Button
      alignItems="center"
      display="flex"
      fontSize="xl"
      isDisabled={value >= max}
      justifyContent="center"
      minWidth="auto"
      variant="unstyled"
      width="36px"
      onClick={() => onChange(value + 1)}
    >
      +
    </Button>
  </Stack>
);

export default Stepper;
