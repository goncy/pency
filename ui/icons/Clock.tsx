import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const ClockIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg fill="none" height={40} viewBox="0 0 40 40" width={40}>
        <path
          d="M20 36.667c9.205 0 16.667-7.462 16.667-16.667 0-9.205-7.462-16.667-16.667-16.667-9.205 0-16.667 7.462-16.667 16.667 0 9.205 7.462 16.667 16.667 16.667z"
          stroke="#319795"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
        <path
          d="M20 10v10l6.667 3.333"
          stroke="#319795"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default ClockIcon;
