import React from "react";
import {Box, Avatar, BoxProps, AvatarProps} from "@chakra-ui/core";

import {Tenant} from "../types";

interface Props extends BoxProps, Omit<AvatarProps, "size"> {
  logo: Tenant["logo"];
  title: Tenant["title"];
  size?: number;
}

const RATIO = 1.5;

const TenantAvatar: React.FC<Props> = ({logo, title, size = 32, ...props}) => {
  return logo ? (
    <Box
      backgroundColor="primary.500"
      backgroundImage={`url(${logo})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      border="4px solid white"
      height={{base: size, sm: size * RATIO}}
      marginTop={{base: -(size / 2), sm: -((size * RATIO) / 2)}}
      minHeight={{base: size, sm: size * RATIO}}
      minWidth={{base: size, sm: size * RATIO}}
      rounded="50%"
      width={{base: size, sm: size * RATIO}}
      {...props}
    />
  ) : (
    <Avatar
      border="4px solid white"
      height={{base: size, sm: size * RATIO}}
      marginTop={{base: -(size / 2), sm: -((size * RATIO) / 2)}}
      minHeight={{base: size, sm: size * RATIO}}
      minWidth={{base: size, sm: size * RATIO}}
      name={title}
      src={logo}
      width={{base: size, sm: size * RATIO}}
      {...props}
    />
  );
};

export default TenantAvatar;
