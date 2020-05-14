import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const FacebookIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg
        fill="currentColor"
        height="22"
        viewBox="0 0 10.22 22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.22 7.12H6.74V4.84a.93.93 0 011-1.06h2.46V0H6.78C3 0 2.17 2.81 2.17 4.61v2.51H0V11h2.17v11h4.57V11h3.08z" />
      </svg>
    </Box>
  );
};

export default FacebookIcon;
