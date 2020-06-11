import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const SquareIcon: React.FC<Props> = ({size, ...props}) => {
  return (
    <Box {...props}>
      <svg fill="none" height={size} viewBox="0 0 40 40" width={size}>
        <path
          d="M35 26.667V13.333a3.334 3.334 0 00-1.667-2.883L21.667 3.783a3.334 3.334 0 00-3.334 0L6.667 10.45A3.333 3.333 0 005 13.333v13.334a3.333 3.333 0 001.667 2.883l11.666 6.667a3.334 3.334 0 003.334 0l11.666-6.667A3.334 3.334 0 0035 26.667z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
        <path
          d="M5.45 11.6L20 20.017 34.55 11.6M20 36.8V20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default SquareIcon;
