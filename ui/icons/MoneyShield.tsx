import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const MoneyShieldIcon: React.FC<Props> = ({size, ...props}) => {
  return (
    <Box {...props}>
      <svg
        fill="none"
        height={size}
        viewBox="0 0 38 38"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.25 21.5A3.75 3.75 0 1019 17.75 3.75 3.75 0 1122.75 14M19 7.75v2.5M19 25.25v2.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          clipRule="evenodd"
          d="M36.5 14.625A22.368 22.368 0 0119 36.5 22.368 22.368 0 011.5 14.625v-8.75A4.375 4.375 0 015.875 1.5h26.25A4.375 4.375 0 0136.5 5.875v8.75z"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </Box>
  );
};

export default MoneyShieldIcon;
