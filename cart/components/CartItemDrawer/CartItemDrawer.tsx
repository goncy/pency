import React from "react";
import {IDrawer, Text, Stack, Box} from "@chakra-ui/core";

import Drawer, {DrawerBody} from "~/ui/controls/Drawer";
import {Product} from "~/product/types";
import Image from "~/ui/feedback/Image";
import ProductOptionsForm from "~/product/forms/ProductOptionsForm/ProductOptionsForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import Button from "~/ui/controls/Button";

interface Props extends Omit<IDrawer, "children"> {
  onSubmit: (product: Product) => void;
  product: Product;
}

const CartItemDrawer: React.FC<Props> = ({onClose, product, onSubmit, ...props}) => {
  function handleSubmit(options: Product["options"]) {
    onSubmit({...product, options});
  }

  return (
    <Drawer id="cart-item" placement="right" size="md" onClose={onClose} {...props}>
      <ProductOptionsForm defaultValues={product.options} onSubmit={handleSubmit}>
        {({form, submit, isLoading}) => (
          <DrawerBody paddingX={0} position="relative">
            <ArrowLeftIcon
              cursor="pointer"
              left={0}
              padding={4}
              position="absolute"
              top={0}
              onClick={onClose}
            />
            {product.image && <Image height="100%" maxHeight="30vh" src={product.image} />}
            <Stack flex={1} marginTop={product.image ? 0 : 8} padding={4} spacing={6}>
              <Stack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold">
                  {product.title}
                </Text>
                <Text color="gray.500">{product.description}</Text>
              </Stack>
              {form}
              <Box marginTop="auto" paddingTop={4}>
                <Button
                  isFullWidth
                  isLoading={isLoading}
                  size="lg"
                  variantColor="primary"
                  onClick={(event) => {
                    event.stopPropagation();

                    submit();
                  }}
                >
                  Agregar
                </Button>
              </Box>
            </Stack>
          </DrawerBody>
        )}
      </ProductOptionsForm>
    </Drawer>
  );
};

export default CartItemDrawer;
