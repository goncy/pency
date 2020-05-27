import React from "react";
import {Button, ButtonProps, Box} from "@chakra-ui/core";

interface Props extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
}

const IconButton: React.FC<Props> = ({leftIcon = null, rightIcon = null, children, ...props}) => {
  return (
    <Button alignItems="center" display="flex" {...props}>
      {leftIcon && React.createElement(leftIcon)}
      <Box
        display={{base: "none", sm: "block"}}
        marginLeft={leftIcon ? 2 : 0}
        marginRight={rightIcon ? 2 : 0}
      >
        {children}
      </Box>
      {rightIcon && React.createElement(rightIcon)}
    </Button>
  );
};

export default IconButton;
