import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const BoxIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-box"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01 20.73 6.96" />
        <path d="M12 22.08L12 12" />
      </svg>
    </Box>
  );
};

export default BoxIcon;
