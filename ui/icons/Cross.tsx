import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const CrossIcon: React.FC<Props> = ({size = 24, ...props}) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-x"
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
        <path d="M18 6L6 18" />
        <path d="M6 6L18 18" />
      </svg>
    </Box>
  );
};

export default CrossIcon;
