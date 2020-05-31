import React from "react";
import {
  Stack,
  Flex,
  Text,
  IconButton,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider,
  Button,
} from "@chakra-ui/core";

import {CartItem} from "../../types";

import CheckoutButton from "./CheckoutButton";

import Badge from "~/ui/feedback/Badge";
import {useTranslation} from "~/hooks/translation";
import {getCount, getTotal} from "~/cart/selectors";

interface Props {
  items: CartItem[];
  onRemove: (id: string) => void;
  onSubmit: VoidFunction;
  hasNextStep: boolean;
}

const Overview: React.FC<Props> = ({items, onRemove, onSubmit, hasNextStep}) => {
  const t = useTranslation();
  const count = getCount(items);
  const total = getTotal(items);

  return (
    <DrawerContent>
      <DrawerCloseButton right="8px" top="8px" />
      <DrawerHeader p={4}>
        {t("cart.yourCart")} ({count})
      </DrawerHeader>
      <DrawerBody overflowY="auto" padding={4}>
        <Stack spacing={6}>
          {items.map(({id, title, options, price, count}) => (
            <Flex key={id} alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" mr={2}>
                <IconButton
                  isRound
                  aria-label="Borrar elemento"
                  fontSize="12px"
                  height={6}
                  icon="minus"
                  minWidth={6}
                  mr={4}
                  variantColor="red"
                  width={6}
                  onClick={() => onRemove(id)}
                />
                <Flex direction="column">
                  <Flex alignItems="center">
                    <Text>{title}</Text>
                    <Badge count={count} marginLeft={2} variantColor="primary" />
                  </Flex>
                  {options && (
                    <Text color="gray.500" fontSize="sm">
                      {options}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex alignItems="center">
                <Text>${price * count}</Text>
              </Flex>
            </Flex>
          ))}
        </Stack>
      </DrawerBody>
      <DrawerFooter padding={4}>
        <Stack spacing={4} width="100%">
          <Divider />
          <Flex alignItems="center" justifyContent="flex-end">
            <Text fontSize="lg" fontWeight="600" mr={2}>
              {t("common.total")}:
            </Text>
            <Text fontSize="lg">${total}</Text>
          </Flex>
          {hasNextStep ? (
            <Button variantColor="primary" onClick={onSubmit}>
              Siguiente
            </Button>
          ) : (
            <CheckoutButton onClick={onSubmit} />
          )}
        </Stack>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default Overview;
