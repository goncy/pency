import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const TwitterIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg
        fill="currentColor"
        height="100%"
        viewBox="0 0 24 19.2"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 2.28a10.09 10.09 0 01-2.83.72A4.88 4.88 0 0023.34.36a9.89 9.89 0 01-3.13 1.18A5 5 0 0016.62 0a4.88 4.88 0 00-4.92 4.84A4.66 4.66 0 0011.82 6 14 14 0 011.67.89 4.78 4.78 0 001 3.32a4.83 4.83 0 002.2 4A4.88 4.88 0 011 6.75v.06a4.87 4.87 0 004 4.75 5 5 0 01-1.3.17 4.72 4.72 0 01-.93-.09A4.92 4.92 0 007.29 15a10 10 0 01-6.12 2.07A10.15 10.15 0 010 17a13.93 13.93 0 007.54 2.2 13.8 13.8 0 0014-13.79v-.62A9.92 9.92 0 0024 2.28z" />
      </svg>
    </Box>
  );
};

export default TwitterIcon;
