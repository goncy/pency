import React from "react";
import {Flex, Button, Stack, Badge, Text, FlexProps} from "@chakra-ui/core";

interface Props extends FlexProps {
  count: number;
  total: number;
  onClick: () => void;
}

const ProductCheckoutButton: React.FC<Props> = ({count, total, children, onClick, ...props}) => (
  <Flex
    alignItems="center"
    bottom={0}
    boxShadow="0 0 6px currentColor"
    color="primary.500"
    display="block"
    justifyContent="center"
    rounded={4}
    {...props}
  >
    <Button
      backgroundColor="primary.500"
      color="white"
      display="flex"
      justifyContent="space-between"
      variantColor="primary"
      width={{base: "100%", sm: "auto"}}
      onClick={onClick}
    >
      <Stack isInline alignItems="center" flex={1} spacing={4}>
        <Badge
          backgroundColor="primary.700"
          color="primary.50"
          fontSize="sm"
          paddingX={2}
          paddingY={1}
          variantColor="primary"
        >
          {count}
        </Badge>
        <Text flex={1}>{children}</Text>
        <Text>${total}</Text>
      </Stack>
    </Button>
  </Flex>
);

export default ProductCheckoutButton;
