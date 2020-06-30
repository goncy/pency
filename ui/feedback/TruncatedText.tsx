import React from "react";
import {Text, BoxProps} from "@chakra-ui/core";

interface Props extends BoxProps {
  lines: number;
}

const TruncatedText: React.FC<Props> = ({lines, children, ...props}) => {
  return (
    <Text
      overflow="hidden"
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TruncatedText;
