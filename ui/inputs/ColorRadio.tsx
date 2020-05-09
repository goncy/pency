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

const ColorRadio: React.ForwardRefExoticComponent<Props> = React.forwardRef((props, ref) => {
  const {isChecked, isDisabled, name, color, onChange, ...rest} = props;
  return (
    <label>
      {/* READ COMMENT BEFORE REMOVE @ts-ignore
      At version 0.7.0 Chakra UI is still migrating
      to typescript, so VisuallyHidden component doesn't accept
      props from the component that will be displayed (in this case Input)
      Check the link below to see Chakra UI migration status 
      https://github.com/chakra-ui/chakra-ui/issues/205
      
      // @ts-ignore */}
      <VisuallyHidden
        ref={ref}
        as="input"
        // @ts-ignore
        checked={isChecked}
        disabled={isDisabled}
        name={name}
        type="radio"
        value={color}
        onChange={onChange}
        {...rest}
      />

      {/* 
      The box inside control box is the one that is shown
      when the input sibling is checked 
      */}
      <ControlBox
        bg={`${color}.400`}
        borderColor="inherit"
        mx="5px"
        rounded="5px"
        size="40px"
        type="radio"
      >
        <Box
          bg={`${color}.400`}
          border="5px solid"
          borderColor={`${color}.100`}
          borderRadius={4}
          h="40px"
          p={5}
          rounded="10px"
          shadow="lg"
          w="40px"
        />
      </ControlBox>
    </label>
  );
});

export default ColorRadio;
