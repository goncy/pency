import React from "react";
import QRCode from "qrcode";
import {Box, BoxProps} from "@chakra-ui/core";

interface Props extends BoxProps {
  text: string;
}

const QrCode: React.FC<Props> = ({text, ...props}) => {
  const canvas = React.useRef<HTMLCanvasElement>();

  React.useEffect(() => {
    QRCode.toCanvas(canvas.current, text, {version: 4});
  }, [text]);

  return <Box ref={canvas} as="canvas" {...props} />;
};

export default QrCode;
