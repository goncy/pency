import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const CustomizableIcon: React.FC<Props> = ({size, ...props}) => {
  return (
    <Box {...props}>
      <svg fill="none" height={size} viewBox="0 0 40 40" width={size}>
        <path
          d="M11.667 35A6.667 6.667 0 015 28.333v-20A3.333 3.333 0 018.333 5H15a3.333 3.333 0 013.333 3.333v20a6.667 6.667 0 01-1.952 4.714M11.667 35a6.667 6.667 0 004.714-1.953M11.667 35h20A3.333 3.333 0 0035 31.667V25a3.333 3.333 0 00-3.333-3.333h-3.905M16.38 33.047l7.071-7.07 7.071-7.072a3.333 3.333 0 000-4.713l-4.715-4.715a3.333 3.333 0 00-4.713 0l-2.762 2.761m-6.666 16.095h.016"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default CustomizableIcon;
