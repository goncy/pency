import React from "react";
import {
  Stack,
  Flex,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  Drawer,
  Divider,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/core";

import {useCart} from "../hooks";

import WhatsAppIcon from "~/ui/icons/WhatsApp";
import Badge from "~/ui/feedback/Badge";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<Props> = ({isOpen, onClose}) => {
  const {items, count, total, remove, checkout} = useCart();

  React.useEffect(() => {
    if (!count) onClose();
  }, [count, onClose]);

  return (
    <Drawer id="cart" isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton right="8px" top="8px" />
        <DrawerHeader p={4}>Tu carrito ({count})</DrawerHeader>
        <DrawerBody overflowY="auto" p={4}>
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
                    onClick={() => remove(id)}
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
                Total:
              </Text>
              <Text fontSize="lg">${total}</Text>
            </Flex>
            <Button
              backgroundColor="primary.500"
              color="white"
              variantColor="primary"
              w="100%"
              onClick={checkout}
            >
              <WhatsAppIcon marginRight={1} />
              Completar pedido
            </Button>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
