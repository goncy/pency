import React from "react";
import {Text, BoxProps} from "@chakra-ui/core";

interface Props extends BoxProps {
  lines: number;
}

const TruncatedText: React.FC<Props> = ({lines, children, ...props}) => {
  const [isToggled, toggle] = React.useState(false);

  return (
    <Text
      overflow="hidden"
      style={{
        display: isToggled ? "inherit" : "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
      }}
      onClick={() => toggle(!isToggled)}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TruncatedText;
