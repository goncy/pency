import React from "react";
import {Box, Grid} from "@chakra-ui/core";

import {COLORS} from "~/app/constants";

interface Props {
  value?: string;
  isDisabled?: boolean;
  onChange: (boolean) => void;
}

const ColorRadio: React.FC<Props> = (props) => {
  const {isDisabled, onChange, value} = props;

  return (
    <Grid
      alignItems="center"
      gridAutoRows={40}
      gridGap={2}
      gridTemplateColumns="repeat(auto-fit, minmax(40px,1fr));"
      justifyContent="center"
    >
      {Object.keys(COLORS).map((color) => {
        const isSelected = value === color;

        return (
          <Box
            key={color}
            alignSelf="center"
            backgroundColor={`${color}.500`}
            border="5px solid"
            borderColor={isSelected ? `${color}.300` : "transparent"}
            cursor={isDisabled ? "inherit" : "pointer"}
            height={isSelected ? 10 : 8}
            justifySelf="center"
            opacity={isDisabled ? 0.5 : 1}
            rounded="lg"
            shadow="lg"
            transition="0.25s all"
            width={isSelected ? 10 : 8}
            onClick={() => !isDisabled && onChange(color)}
          />
        );
      })}
    </Grid>
  );
};

export default ColorRadio;
