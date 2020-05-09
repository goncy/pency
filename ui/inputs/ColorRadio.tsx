import React from "react";
import {VisuallyHidden, ControlBox, Box} from "@chakra-ui/core";

interface Props {
  name: string;
  color: string;
  value?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  onChange?: (boolean) => void;
}

const ColorRadio: React.FC<Props> = ({color, ...rest}) => {
  return (
    <label>
      {/*
      // @ts-ignore */}
      <VisuallyHidden
        as="input"
        // @ts-ignore
        checked={rest.isChecked}
        type="radio"
        value={rest.value}
        onChange={rest.onChange}
      />

      <ControlBox
        _checked={{
          border: `5px solid black`,
          borderColor: `${color}.100`,
          borderRadius: 4,
          shadow: "lg",
          rounded: "10px",
        }}
        bg={`${color}.400`}
        mx="5px"
        p={5}
        rounded="5px"
        size="40px"
      >
        <Box
          bg={`${color}.400`}
          border="5px solid"
          borderColor={`${color}.100`}
          borderRadius={4}
          h="40px"
          mx="5px"
          p={5}
          rounded="10px"
          shadow="lg"
          w="40px"
        />
      </ControlBox>
    </label>
  );
};

export default ColorRadio;
