import React from "react";
import {Box, Avatar, AvatarProps} from "@chakra-ui/core";

import {Tenant} from "../types";

interface Props extends AvatarProps {
  logo: Tenant["logo"];
  title: Tenant["title"];
}

const TenantAvatar: React.FC<Props> = ({logo, title, ...props}) => {
  return logo ? (
    <Box
      backgroundColor="primary.500"
      backgroundImage={`url(${logo})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      border="4px solid white"
      height={{base: 24, sm: 32}}
      marginTop={{base: -6, sm: -8}}
      minHeight={{base: 24, sm: 32}}
      minWidth={{base: 24, sm: 32}}
      rounded="50%"
      width={{base: 24, sm: 32}}
      {...props}
    />
  ) : (
    <Avatar
      border="4px solid white"
      height={{base: 24, sm: 32}}
      marginTop={{base: -6, sm: -8}}
      minHeight={{base: 24, sm: 32}}
      minWidth={{base: 24, sm: 32}}
      name={title}
      src={logo}
      width={{base: 24, sm: 32}}
      {...props}
    />
  );
};

export default TenantAvatar;
