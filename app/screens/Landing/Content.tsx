import React from "react";
import {BoxProps} from "@chakra-ui/core";

import BaseContent from "~/ui/structure/Content";

const Content: React.FC<BoxProps> = ({children, ...props}) => (
  <BaseContent maxWidth={{base: "100%", xl: "1440px"}} paddingX={4} {...props}>
    {children}
  </BaseContent>
);

export default Content;
