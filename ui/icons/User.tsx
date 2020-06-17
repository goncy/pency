import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const UserIcon: React.FC<Props> = ({size = 24, ...props}) => {
  return (
    <Box {...props}>
      <svg fill="none" height={size} viewBox="0 0 40 40" width={size}>
        <path
          d="M33.333 35v-3.333A6.667 6.667 0 0026.667 25H13.333a6.667 6.667 0 00-6.666 6.667V35M20 18.333A6.667 6.667 0 1020 5a6.667 6.667 0 000 13.333z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default UserIcon;
