import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const DuplicateIcon: React.FC<Props> = ({size = 20, ...props}) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-copy"
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
    </Box>
  );
};

export default DuplicateIcon;
