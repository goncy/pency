import React from "react";
import {IconButtonProps, IconButton as ChakraIconButton} from "@chakra-ui/core";
import styled from "@emotion/styled";

const IconButton = styled(ChakraIconButton)`
  min-width: auto;
  min-height: auto;

  svg {
    max-width: 20px;
    max-height: 20px;
  }
`;

const SocialButton: React.FC<IconButtonProps> = (props) => (
  <IconButton
    isRound
    _hover={{
      color: "white",
      backgroundColor: "teal.700",
    }}
    backgroundColor="white"
    color="teal.600"
    height="36px"
    variantColor="teal"
    width="36px"
    {...props}
  />
);

export default SocialButton;
