import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const UploadIcon: React.FC<Props> = ({size = 24, ...props}) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-upload"
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
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <path d="M17 8L12 3 7 8" />
        <path d="M12 3L12 15" />
      </svg>
    </Box>
  );
};

export default UploadIcon;
