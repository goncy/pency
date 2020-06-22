import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const UserDistanceIcon: React.FC<Props> = ({size, ...props}) => {
  return (
    <Box {...props}>
      <svg
        fill="none"
        height={size}
        viewBox="0 0 40 40"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M10 11.25a5 5 0 100-10 5 5 0 000 10z"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M17.592 18.147A8.752 8.752 0 001.25 22.5v3.75H5l1.25 12.5h7.5l.538-5.388"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          clipRule="evenodd"
          d="M28.75 38.75c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M21.68 35.818L35.82 21.68"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          clipRule="evenodd"
          d="M27.493 10a4.375 4.375 0 100-8.75 4.375 4.375 0 000 8.75z"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M33.987 15a7.5 7.5 0 00-12.14-1.183"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </Box>
  );
};

export default UserDistanceIcon;
