import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const HomeIcon: React.FC<Props> = ({size = 24, ...props}) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-home"
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
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22L9 12 15 12 15 22" />
      </svg>
    </Box>
  );
};

export default HomeIcon;
