import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const PlusIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-plus"
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
        <path d="M12 5L12 19" />
        <path d="M5 12L19 12" />
      </svg>
    </Box>
  );
};

export default PlusIcon;
