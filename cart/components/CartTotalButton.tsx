import React from "react";
import {Flex, Button, Stack, Badge, Text} from "@chakra-ui/core";

import {useTranslation} from "~/hooks/translation";

interface Props {
  onClick: VoidFunction;
  count: number;
  total: number;
}

const CartTotalButton: React.FC<Props> = ({onClick, count, total}) => {
  const {t} = useTranslation();

  return (
    <Flex
      alignItems="center"
      boxShadow="0 0 6px currentColor"
      color="primary.500"
      display="block"
      justifyContent="center"
      margin={{base: 0, sm: "auto"}}
      rounded={4}
      width={{base: "100%", sm: "auto"}}
    >
      <Button
        backgroundColor="primary.500"
        color="white"
        display="flex"
        justifyContent="space-between"
        paddingLeft={2}
        paddingRight={3}
        variantColor="primary"
        width="100%"
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
          <Text flex={1}>{t("products.check")}</Text>
          <Text>${total}</Text>
        </Stack>
      </Button>
    </Flex>
  );
};

export default CartTotalButton;
