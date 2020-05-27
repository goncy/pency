import React from "react";
import {Box, StackProps, Stack, Text} from "@chakra-ui/core";

import ProductRow from "./ProductRow";

import {Product} from "~/product/types";

interface Props extends StackProps {
  products: Product[];
  title?: string;
  onEdit: (product: Product) => void;
  onRemove: (id: Product["id"]) => Promise<void>;
}

const ProductsList: React.FC<Props> = ({title = null, products, onEdit, onRemove, ...props}) => (
  <Stack spacing={0} {...props}>
    {title && (
      <Stack
        isInline
        alignItems="center"
        borderBottomWidth={1}
        fontSize="xl"
        fontWeight={500}
        paddingBottom={2}
        spacing={2}
      >
        <Text>{title}</Text>
        <Text color="gray.500">({products.length})</Text>
      </Stack>
    )}
    <Box as="table" width="100%">
      <Box as="tbody">
        {products.map((product) => (
          <ProductRow key={product.id} onEdit={onEdit} onRemove={onRemove} {...product} />
        ))}
      </Box>
    </Box>
  </Stack>
);

export default ProductsList;
