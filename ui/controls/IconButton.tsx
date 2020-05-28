import React from "react";
import {Button, ButtonProps, Box} from "@chakra-ui/core";

interface Props extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  children?: React.ReactNode;
  toggleOnBase?: boolean;
}

const IconButton: React.FC<Props> = ({
  leftIcon = null,
  rightIcon = null,
  children = null,
  toggleOnBase = false,
  ...props
}) => {
  return (
    <Button alignItems="center" display="flex" {...props}>
      {leftIcon && React.createElement(leftIcon)}
      {children && (
        <Box
          display={{base: toggleOnBase ? "none" : "block", sm: "block"}}
          marginLeft={leftIcon ? 2 : 0}
          marginRight={rightIcon ? 2 : 0}
        >
          {children}
        </Box>
      )}
      {rightIcon && React.createElement(rightIcon)}
    </Button>
  );
};

export default IconButton;
