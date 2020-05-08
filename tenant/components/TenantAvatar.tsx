import React from "react";
import {Box, Avatar} from "@chakra-ui/core";

import {Tenant} from "../types";

interface Props {
  logo: Tenant["logo"];
  title: Tenant["title"];
}

const TenantAvatar: React.FC<Props> = ({logo, title}) =>
  logo ? (
    <Box
      backgroundColor="primary.500"
      backgroundImage={`url(${logo})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      border="4px solid white"
      height={24}
      marginTop={-12}
      minHeight={24}
      minWidth={24}
      rounded="50%"
      width={24}
    />
  ) : (
    <Avatar
      border="4px solid white"
      height={24}
      marginTop={-12}
      name={title}
      src={logo}
      width={24}
    />
  );

export default TenantAvatar;
