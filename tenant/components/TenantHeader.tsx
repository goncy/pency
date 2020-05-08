import React from "react";
import {Box, Text, Flex, Stack, Link, IconButton, Heading, BoxProps} from "@chakra-ui/core";

import {useTenant} from "../hooks";

import TenantAvatar from "./TenantAvatar";

const TenantHeader: React.FC<BoxProps> = (props) => {
  const {banner, title, logo, phone, description} = useTenant();

  return (
    <Box height="100%" {...props}>
      <Box
        backgroundColor="primary.500"
        backgroundImage={`url(${banner})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        height={{base: 32, sm: 64}}
        minHeight={{base: 32, sm: 64}}
        width="100%"
      />
      <Flex justifyContent="space-between" padding={4}>
        <TenantAvatar logo={logo} title={title} />
        <Stack isInline spacing={4}>
          <Link isExternal href={`tel:${phone}`}>
            <IconButton aria-label="phone" icon="phone" rounded="50%" variantColor="primary" />
          </Link>
        </Stack>
      </Flex>
      <Stack paddingX={4}>
        <Heading as="h1">{title}</Heading>
        <Text color="gray.500">{description}</Text>
      </Stack>
    </Box>
  );
};

export default TenantHeader;
