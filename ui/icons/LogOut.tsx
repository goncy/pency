import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const LogOutIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-log-out"
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
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <path d="M16 17L21 12 16 7" />
        <path d="M21 12L9 12" />
      </svg>
    </Box>
  );
};

export default LogOutIcon;
