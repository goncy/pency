import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const UsersChatIcon: React.FC<Props> = ({size, ...props}) => {
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
          d="M8.75 28.75a5 5 0 100-10 5 5 0 000 10z"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M1.25 38.75a7.5 7.5 0 0115 0M35.582 21.25a5 5 0 11-9.334 2.5M23.75 38.75a7.5 7.5 0 0115 0"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          clipRule="evenodd"
          d="M13.75 16.25h5v7.5l7.5-7.5h7.5v-15h-20v15z"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M18.75 6.25h10M18.75 11.25h10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </Box>
  );
};

export default UsersChatIcon;
