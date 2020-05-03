import React from "react";
import {Flex, Box, Image, Heading} from "@chakra-ui/core";

import {useTenant} from "~/tenant/hooks";

const Header = () => {
  const {logo, slug, hue} = useTenant();

  return (
    <Flex
      align="center"
      as="nav"
      bg={`primary.${hue}`}
      color="white"
      justifyContent="space-between"
      paddingX={4}
      paddingY={2}
      wrap="wrap"
    >
      <Box height="100%">
        {logo ? (
          <Image height="100%" maxHeight={12} objectFit="contain" src={logo} />
        ) : (
          <Heading as="h1" size="lg">
            {slug}
          </Heading>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
