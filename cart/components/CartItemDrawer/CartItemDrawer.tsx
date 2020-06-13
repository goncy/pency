import React from "react";
import {IDrawer, Text, Stack, Flex} from "@chakra-ui/core";

import Drawer, {DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Product, Variant} from "~/product/types";
import Image from "~/ui/feedback/Image";
import ProductVariantForm from "~/product/forms/ProductVariantForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import Button from "~/ui/controls/Button";
import Stepper from "~/ui/inputs/Stepper";
import FormLabel from "~/ui/form/FormLabel";

interface Props extends Omit<IDrawer, "children"> {
  onSubmit: (product: Product, options: Variant[], count: number) => void;
  product: Product;
}

const CartItemDrawer: React.FC<Props> = ({onClose, product, onSubmit, ...props}) => {
  const [count, setCount] = React.useState(1);

  function handleSubmit(options: Variant[]) {
    onSubmit(product, options, count);
  }

  return (
    <Drawer id="cart-item" placement="right" size="md" onClose={onClose} {...props}>
      <ProductVariantForm defaultValues={product.options} onSubmit={handleSubmit}>
        {({form, submit, isLoading}) => (
          <>
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
              <Stack
                shouldWrapChildren
                direction="column"
                flex={1}
                marginTop={product.image ? 0 : 8}
                paddingTop={4}
                paddingX={{base: 4, sm: 12}}
                spacing={6}
              >
                <Stack spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {product.title}
                  </Text>
                  <Text color="gray.500" fontSize="md">
                    {product.description}
                  </Text>
                </Stack>
                {form}
                <Flex alignItems="center" justifyContent="space-between">
                  <FormLabel>Cantidad</FormLabel>
                  <Stepper min={1} value={count} onChange={setCount} />
                </Flex>
              </Stack>
            </DrawerBody>
            <DrawerFooter>
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
            </DrawerFooter>
          </>
        )}
      </ProductVariantForm>
    </Drawer>
  );
};

export default CartItemDrawer;
