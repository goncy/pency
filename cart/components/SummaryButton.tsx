import React from "react";
import {Stack, Badge, Text, ButtonProps} from "@chakra-ui/core";

import {CartItem} from "../types";
import {getTotal, getCount} from "../selectors";

import Button from "~/ui/controls/Button";
import {useTranslation, usePrice} from "~/i18n/hooks";

interface Props extends ButtonProps {
  items: CartItem[];
}

const SummaryButton: React.FC<Props> = ({children, items, ...props}) => {
  const total = getTotal(items);
  const count = getCount(items);
  const t = useTranslation();
  const p = usePrice();

  return (
    <Button
      boxShadow="lg"
      display="flex"
      paddingX={4}
      size="lg"
      variantColor="primary"
      width="100%"
      {...props}
    >
      <Stack isInline alignItems="center" flex={1} spacing={2}>
        <Text>{children}</Text>
        <Badge
          backgroundColor="primary.600"
          color="white"
          fontSize="sm"
          fontWeight={300}
          paddingX={2}
          paddingY={1}
          textTransform="none"
          variantColor="primary"
        >
          <Text textTransform="lowercase">
            {count} {t("common.item", {count})}
          </Text>
        </Badge>
        <Text flex={1} justifySelf="flex-end" textAlign="right">
          {p(total)}
        </Text>
      </Stack>
    </Button>
  );
};

export default SummaryButton;
