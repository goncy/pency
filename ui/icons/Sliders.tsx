import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const SlidersIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-sliders"
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
        <path d="M4 21L4 14" />
        <path d="M4 10L4 3" />
        <path d="M12 21L12 12" />
        <path d="M12 8L12 3" />
        <path d="M20 21L20 16" />
        <path d="M20 12L20 3" />
        <path d="M1 14L7 14" />
        <path d="M9 8L15 8" />
        <path d="M17 16L23 16" />
      </svg>
    </Box>
  );
};

export default SlidersIcon;
