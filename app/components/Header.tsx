import React from "react";
import {Flex, Heading, Image} from "@chakra-ui/core";

import {useTenant} from "~/tenant/hooks";

const Header = () => {
  const {logo, slug, hue} = useTenant();

  function handleScrollTop() {
    document.querySelector("main")?.scrollTo({top: 0});
  }

  return (
    <Flex
      align="center"
      as="nav"
      bg={`primary.${hue}`}
      color="white"
      justifyContent="space-between"
      padding={3}
      wrap="wrap"
    >
      <Heading as="h1" cursor="pointer" size="lg" onClick={handleScrollTop}>
        {logo ? <Image maxHeight={16} src={logo} /> : slug}
      </Heading>
    </Flex>
  );
};

export default Header;
