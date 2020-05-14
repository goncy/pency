import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const InstagramIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box fill="currentColor" {...props}>
      <svg height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5h10m0-2H7a7 7 0 00-7 7v10a7 7 0 007 7h10a7 7 0 007-7V7a7 7 0 00-7-7z" />
        <path d="M18.5 7A1.5 1.5 0 1120 5.5 1.5 1.5 0 0118.5 7zM12 8a4 4 0 11-4 4 4 4 0 014-4m0-2a6 6 0 106 6 6 6 0 00-6-6z" />
      </svg>
    </Box>
  );
};

export default InstagramIcon;
