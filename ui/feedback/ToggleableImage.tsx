import React from "react";
import {BoxProps, ImageProps} from "@chakra-ui/core";

import Image from "./Image";

interface Props extends BoxProps {
  src: ImageProps["src"];
}

const ToggleableImage: React.FC<Props> = ({maxHeight = "30vh", ...props}) => {
  const [isToggled, toggle] = React.useState(false);

  return (
    <Image
      {...props}
      backgroundSize={isToggled ? "contain" : "cover"}
      cursor="pointer"
      height="100%"
      maxHeight={isToggled ? "100%" : maxHeight}
      transition="max-height 0.25s"
      onClick={() => toggle(!isToggled)}
    />
  );
};

export default ToggleableImage;
