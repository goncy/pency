import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const MarkerIcon: React.FC<Props> = ({size = 6, ...props}) => {
  return (
    <Box height={size} width={size} {...props}>
      <svg
        className="feather feather-map-pin"
        fill="none"
        height="100%"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </Box>
  );
};

export default MarkerIcon;
