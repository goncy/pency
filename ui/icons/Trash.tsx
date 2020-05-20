import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const TrashIcon: React.FC<Props> = ({size = 20, ...props}) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-trash-2"
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
        <path d="M3 6L5 6 21 6" />
        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path d="M10 11L10 17" />
        <path d="M14 11L14 17" />
      </svg>
    </Box>
  );
};

export default TrashIcon;
