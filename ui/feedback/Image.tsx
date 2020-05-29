import React from "react";
import {Image as ChakraImage, ImageProps as ChakraImageProps} from "@chakra-ui/core";
import styled from "@emotion/styled";
import {keyframes} from "@emotion/core";

interface Props extends ChakraImageProps {
  isAnimated?: boolean;
}

interface ImageProps extends ChakraImageProps {
  isAnimated: Props["isAnimated"];
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1
  }
`;

const Image = styled(ChakraImage)`
  animation: ${({isAnimated}: ImageProps) => (isAnimated ? fadeIn : null)} 0.5s;
  animation-fill-mode: forwards;
`;

const FixedImage: React.FC<Props> = ({isAnimated = false, ...props}) => {
  return (
    <Image
      backgroundColor="gray.100"
      fallbackSrc="/assets/fallback.jpg"
      height="100%"
      isAnimated={isAnimated}
      loading="lazy"
      objectFit="cover"
      opacity={isAnimated ? 0 : 1}
      width="100%"
      {...props}
    />
  );
};

export default FixedImage;
