import React from "react";
import {Box, BoxProps, ImageProps} from "@chakra-ui/core";

interface Props extends BoxProps {
  src: ImageProps["src"];
}

const Image: React.FC<Props> = ({src, ...props}) => {
  const [image, setImage] = React.useState(null);
  const container = React.useRef();

  React.useLayoutEffect(() => {
    let observer: IntersectionObserver;

    if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
      observer = new IntersectionObserver(
        (intersections) => {
          const isShowing = intersections[0]?.isIntersecting;

          if (isShowing) {
            setImage(src);
          }
        },
        {rootMargin: `45px`},
      );

      observer.observe(container.current);
    } else {
      setImage(src);
    }

    return () => observer?.disconnect();
  }, [src]);

  return (
    <Box
      ref={container}
      backgroundColor="gray.100"
      backgroundImage={image ? `url(${src})` : ""}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      border="none"
      flexShrink={0}
      height="100%"
      width="100%"
      {...props}
    />
  );
};

export default Image;
