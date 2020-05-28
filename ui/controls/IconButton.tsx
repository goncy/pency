import React from "react";
import {Button, ButtonProps, Box} from "@chakra-ui/core";

interface Props extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  children?: React.ReactNode;
}

const IconButton: React.FC<Props> = ({
  leftIcon = null,
  rightIcon = null,
  children = null,
  ...props
}) => {
  return (
    <Button alignItems="center" display="flex" {...props}>
      {leftIcon && React.createElement(leftIcon)}
      {children && (
        <Box
          display={{base: "none", sm: "block"}}
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
