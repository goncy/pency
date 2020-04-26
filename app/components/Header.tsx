import React from "react";
import { useTenant } from "~/tenant/hooks";
import { Flex, Heading, Image } from "@chakra-ui/core";

const Header = () => {
  const {logo, slug, hue} = useTenant();

  return <Flex
  align="center"
  as="nav"
  bg={`primary.${hue}`}
  color="white"
  justifyContent="space-between"
  padding={3}
  wrap="wrap"
  >
  <Heading as="h1" size="lg">
    {logo ? <Image maxHeight={16} src={logo} /> : slug}
  </Heading>
  </Flex>
}

export default Header;
