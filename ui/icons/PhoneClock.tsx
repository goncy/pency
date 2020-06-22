import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const PhoneClockIcon: React.FC<Props> = ({size, ...props}) => {
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
          d="M27.5 27.5v6.25a5 5 0 01-5 5H10a5 5 0 01-5-5V6.25a5 5 0 015-5h2.5M5 30.867h22.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          clipRule="evenodd"
          d="M23.333 21.667c5.523 0 10-4.478 10-10 0-5.523-4.477-10-10-10-5.522 0-10 4.477-10 10 0 5.522 4.478 10 10 10z"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M22.663 7.247v4.42h4.42"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </Box>
  );
};

export default PhoneClockIcon;
