import React from "react";
import {IconButtonProps, IconButton} from "@chakra-ui/core";

const SocialButton: React.FC<IconButtonProps> = (props) => (
  <IconButton
    _hover={{
      color: "white",
      backgroundColor: "teal.700",
    }}
    backgroundColor="white"
    color="teal.600"
    rounded="50%"
    variantColor="teal"
    {...props}
  />
);

export default SocialButton;
