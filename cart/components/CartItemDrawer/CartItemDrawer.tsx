import React from "react";
import {IDrawer, Text, Stack, Box, Flex} from "@chakra-ui/core";

import Drawer, {DrawerBody} from "~/ui/controls/Drawer";
import {Product, Variant} from "~/product/types";
import Image from "~/ui/feedback/Image";
import ProductVariantForm from "~/product/forms/ProductVariantForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import Button from "~/ui/controls/Button";
import FormControl from "~/ui/form/FormControl";
import Stepper from "~/ui/inputs/Stepper";

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
            <Flex
              direction="column"
              flex={1}
              marginTop={product.image ? 0 : 8}
              paddingX={{base: 4, sm: 12}}
              paddingY={4}
            >
              <Stack marginBottom={6} spacing={2}>
                <Text fontSize="2xl" fontWeight="bold">
                  {product.title}
                </Text>
                <Text color="gray.500">{product.description}</Text>
              </Stack>
              {form}
              <FormControl label="Cantidad" marginY={6}>
                <Stepper min={1} value={count} onChange={setCount} />
              </FormControl>
              <Box marginTop="auto">
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
            </Flex>
          </DrawerBody>
        )}
      </ProductVariantForm>
    </Drawer>
  );
};

export default CartItemDrawer;
