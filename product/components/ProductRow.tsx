import React from "react";
import {Flex, AspectRatioBox, IconButton, Image, Text, Tooltip} from "@chakra-ui/core";
import LazyLoad from "react-lazy-load";

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
      <LazyLoad height={64} offsetVertical={128} width={64}>
        <AspectRatioBox maxWidth={16} ratio={1} width="100%">
          <Image
            backgroundColor="gray.100"
            borderWidth={1}
            objectFit="cover"
            rounded="lg"
            src={product.image}
          />
        </AspectRatioBox>
      </LazyLoad>
      <Text flex={1} fontSize="lg" marginX={4}>
        {product.title}
      </Text>
      <Tooltip aria-label="Duplicar producto" label="Duplicar producto" placement="left">
        <IconButton
          alignSelf="flex-end"
          aria-label="Duplicar producto"
          icon="copy"
          margin="auto"
          size="lg"
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation();

            onClick({...product, id: null, title: `${product.title} (copia)`});
          }}
        />
      </Tooltip>
      <IconButton
        alignSelf="flex-end"
        aria-label="Borrar producto"
        icon="delete"
        isLoading={status === "pending"}
        margin="auto"
        size="lg"
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
