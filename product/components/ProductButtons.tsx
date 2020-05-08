import React from "react";
import {Box, ButtonGroup, Button, Flex, useDisclosure} from "@chakra-ui/core";

import {Product} from "../types";

import ProductOptionsDrawer from "./ProductOptionsDrawer";

interface Props {
  product: Product;
  count: number;
  onAdd: (product: Product) => void;
  onRemove: (id: Product["id"]) => void;
}

const ProductButtons: React.FC<Props> = ({onAdd, onRemove, count, product}) => {
  const {isOpen: isOptionsOpen, onToggle: toggleOptions} = useDisclosure();
  const hasOptions = Boolean(product.options?.length);
  const isInCart = Boolean(count);

  function handleAdd() {
    if (hasOptions) {
      return toggleOptions();
    }

    return onAdd(product);
  }

  function handleRemove() {
    onRemove(product.id);
  }

  function handleAddWithOptions(options) {
    toggleOptions();

    return onAdd({...product, options});
  }

  return (
    <>
      <Box position="relative">
        {!hasOptions && isInCart ? (
          <ButtonGroup width={24}>
            <Button onClick={handleRemove}>-</Button>
            <Button onClick={handleAdd}>+</Button>
          </ButtonGroup>
        ) : (
          <Button width={24} onClick={handleAdd}>
            Agregar
          </Button>
        )}
        {isInCart && (
          <Flex
            alignItems="center"
            backgroundColor="primary.500"
            border="2px solid white"
            borderRadius="50%"
            color="white"
            fontSize="16px"
            height="26px"
            justifyContent="center"
            position="absolute"
            right="-13px"
            top="-13px"
            width="26px"
            zIndex={1}
          >
            {count}
          </Flex>
        )}
      </Box>
      <ProductOptionsDrawer
        isOpen={hasOptions && isOptionsOpen}
        options={product.options}
        onClose={toggleOptions}
        onSubmit={handleAddWithOptions}
      />
    </>
  );
};

export default ProductButtons;
