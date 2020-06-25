import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const ShareIcon: React.FC<Props> = ({size = 24, ...props}) => {
  return (
    <Box {...props}>
      <svg fill="none" height={size} viewBox="0 0 40 40" width={size}>
        <path
          d="M30 13.333a5 5 0 100-10 5 5 0 000 10zM10 25a5 5 0 100-10 5 5 0 000 10zM30 36.667a5 5 0 100-10 5 5 0 000 10zM14.317 22.517L25.7 29.15M25.683 10.85l-11.366 6.633"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default ShareIcon;
