import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const UserIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg fill="none" height={40} viewBox="0 0 40 40" width={40}>
        <path
          d="M33.333 35v-3.333A6.667 6.667 0 0026.667 25H13.333a6.667 6.667 0 00-6.666 6.667V35M20 18.333A6.667 6.667 0 1020 5a6.667 6.667 0 000 13.333z"
          stroke="#2C7A7B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default UserIcon;
