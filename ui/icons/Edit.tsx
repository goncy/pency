import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const EditIcon: React.FC<Props> = ({size = 20, ...props}) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-edit"
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
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </Box>
  );
};

export default EditIcon;
