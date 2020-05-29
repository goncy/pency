import React from "react";
import {Avatar, AvatarProps} from "@chakra-ui/core";

import {Tenant} from "../types";

import Image from "~/ui/feedback/Image";

interface Props extends Omit<AvatarProps, "onLoad" | "onError"> {
  logo: Tenant["logo"];
  title: Tenant["title"];
}

const TenantAvatar: React.FC<Props> = ({logo, title, ...props}) => {
  return logo ? (
    <Image
      borderColor="gray.100"
      borderWidth={2}
      boxShadow="inset 0 0 2px rgba(0,0,0,0.2)"
      height={{base: 24, sm: 32}}
      minHeight={{base: 24, sm: 32}}
      minWidth={{base: 24, sm: 32}}
      rounded="50%"
      src={logo}
      width={{base: 24, sm: 32}}
      {...props}
    />
  ) : (
    <Avatar
      borderColor="gray.100"
      borderWidth={2}
      boxShadow="sm"
      height={{base: 24, sm: 32}}
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
