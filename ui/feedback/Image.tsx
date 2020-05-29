import React from "react";
import {Box, BoxProps, ImageProps} from "@chakra-ui/core";

interface Props extends BoxProps {
  src: ImageProps["src"];
}

const Image: React.FC<Props> = ({src, ...props}) => {
  return (
    <Box
      backgroundColor="gray.100"
      backgroundImage={`url(${src})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      border="none"
      boxShadow="inset 0 0 2px rgba(0,0,0,0.2)"
      flexShrink={0}
      height="100%"
      width="100%"
      {...props}
    />
  );
};

export default Image;
