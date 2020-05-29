import React from "react";
import {Image as ChakraImage, ImageProps as ChakraImageProps} from "@chakra-ui/core";

const Image: React.FC<ChakraImageProps> = (props) => {
  return (
    <ChakraImage
      backgroundColor="gray.100"
      height="100%"
      loading="lazy"
      objectFit="cover"
      width="100%"
      {...props}
    />
  );
};

export default Image;
