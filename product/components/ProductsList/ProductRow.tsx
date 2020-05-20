import React from "react";
import {AspectRatioBox, IconButton, Image, Text, Tooltip, Stack, Flex, Box} from "@chakra-ui/core";
import LazyLoad from "react-lazy-load";

import {Product} from "../../types";

import {useToast} from "~/hooks/toast";
import TrashIcon from "~/ui/icons/Trash";
import DuplicateIcon from "~/ui/icons/Duplicate";
import EditIcon from "~/ui/icons/Edit";

interface Props extends Product {
  onEdit: (product: Product) => void;
  onRemove: (product: Product["id"]) => Promise<void>;
}

const ProductRow: React.FC<Props> = ({onEdit, onRemove, ...product}) => {
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
    <>
      <Flex alignItems="center">
        <LazyLoad height={48} offsetVertical={128} width={48}>
          <AspectRatioBox maxWidth={12} ratio={1} width="100%">
            {product.image ? (
              <Image
                backgroundColor="gray.100"
                borderWidth={1}
                objectFit="cover"
                rounded="lg"
                src={product.image}
              />
            ) : (
              <Box />
            )}
          </AspectRatioBox>
        </LazyLoad>
        <Text flex={1} fontWeight="500" marginLeft={2}>
          {product.title}
        </Text>
      </Flex>
      <Text fontWeight="500">${product.price}</Text>
      <Text>{product.category || null}</Text>
      <Text>{product.options?.length ? "Con opciones" : "Sin opciones"}</Text>
      <Stack isInline spacing={1}>
        <Tooltip aria-label="Editar producto" label="Editar producto" placement="left">
          <IconButton
            _hover={{color: "primary.500", opacity: 1}}
            alignSelf="flex-end"
            aria-label="Editar producto"
            icon={EditIcon}
            opacity={0.5}
            size="lg"
            variant="ghost"
            onClick={() => onEdit(product)}
          />
        </Tooltip>
        <Tooltip aria-label="Duplicar producto" label="Duplicar producto" placement="left">
          <IconButton
            _hover={{color: "primary.500", opacity: 1}}
            alignSelf="flex-end"
            aria-label="Duplicar producto"
            icon={DuplicateIcon}
            opacity={0.5}
            size="lg"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();

              onEdit({...product, id: null, title: `${product.title} (copia)`});
            }}
          />
        </Tooltip>
        <IconButton
          _hover={{color: "red.500", opacity: 1}}
          alignSelf="flex-end"
          aria-label="Borrar producto"
          icon={TrashIcon}
          isLoading={status === "pending"}
          opacity={0.5}
          size="lg"
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation();

            handleRemove(product.id);
          }}
        />
      </Stack>
    </>
  );
};

export default ProductRow;
