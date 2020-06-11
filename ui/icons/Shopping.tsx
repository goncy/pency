import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const ShoppingIcon: React.FC<Props> = ({size, ...props}) => {
  return (
    <Box {...props}>
      <svg fill="none" height={size} viewBox="0 0 40 40" width={size}>
        <path
          d="M10 3.333L5 10v23.333a3.333 3.333 0 003.333 3.334h23.334A3.333 3.333 0 0035 33.333V10l-5-6.667H10zM5 10h30M26.667 16.667a6.666 6.666 0 11-13.334 0"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default ShoppingIcon;
