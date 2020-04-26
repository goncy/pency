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
  Heading,
  Button,
  IconButton,
} from "@chakra-ui/core";

import {useCart} from "../hooks";

import {groupBy} from "~/selectors/group";
import {getOptionsString} from "~/product/selectors";
import WhatsAppIcon from "~/ui/icons/WhatsApp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<Props> = ({isOpen, onClose}) => {
  const {cart, count, total, remove, checkout} = useCart();
  const productsByCategory = Object.entries(groupBy(cart, (item) => item.product.category));

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
            {productsByCategory.map(([category, items]) => (
              <Stack key={category} spacing={6}>
                <Heading as="h4" size="md" textTransform="capitalize">
                  {category}
                </Heading>
                {items.map(({id, product}) => (
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
                        <Text>{product.title}</Text>
                        {product.options && (
                          <Text color="gray.500" fontSize="sm">
                            {getOptionsString(product.options)}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                    <Flex alignItems="center">
                      <Text>${Number(product.price)}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter padding={2}>
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
