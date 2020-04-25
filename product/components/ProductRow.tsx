import React from "react";
import {Flex, AspectRatioBox, IconButton, Image, Text} from "@chakra-ui/core";

import {Product} from "../types";

import {useToast} from "~/hooks/toast";

interface Props extends Product {
  onClick: (product: Product) => void;
  onRemove: (product: Product["id"]) => Promise<void>;
}

const ProductRow: React.FC<Props> = ({onClick, onRemove, ...product}) => {
  const [status, setStatus] = React.useState("init");
  const toast = useToast();

  async function handleRemove(product: Product["id"]) {
    setStatus("pending");

    onRemove(product).catch(() => {
      setStatus("init");

      toast({status: "error", title: "Error", description: "No se pudo borrar el producto"});
    });
  }

  return (
    <Flex
      alignItems="center"
      borderWidth={1}
      cursor="pointer"
      padding={2}
      rounded="lg"
      onClick={() => onClick(product)}
    >
      <AspectRatioBox maxWidth={16} ratio={1} width="100%">
        <Image backgroundColor="gray.100" borderWidth={1} rounded="lg" src={product.image} />
      </AspectRatioBox>
      <Text flex={1} fontSize="lg" marginX={4}>
        {product.title}
      </Text>
      <IconButton
        alignSelf="flex-end"
        aria-label="Borrar producto"
        icon="delete"
        isLoading={status === "pending"}
        margin="auto"
        variant="ghost"
        variantColor="red"
        onClick={(event) => {
          event.stopPropagation();

          handleRemove(product.id);
        }}
      />
    </Flex>
  );
};

export default ProductRow;
