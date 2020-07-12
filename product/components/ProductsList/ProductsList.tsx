import React from "react";
import {Box, StackProps, Stack, Text} from "@chakra-ui/core";

import ProductRow from "./ProductRow";

import {Product} from "~/product/types";
import ChevronUpIcon from "~/ui/icons/ChevronUp";
import ChevronDownIcon from "~/ui/icons/ChevronDown";

interface Props extends StackProps {
  products: Product[];
  title?: string;
  onEdit: (product: Product) => void;
  onRemove: (id: Product["id"]) => Promise<void>;
}

const ProductsList: React.FC<Props> = ({title = null, products, onEdit, onRemove, ...props}) => {
  // If it doesn't have a title, show it
  const [isToggled, toggle] = React.useState(!Boolean(title));

  // Handle toggle when title is clicked
  function handleToggle() {
    toggle(!isToggled);
  }

  return (
    <Stack spacing={0} {...props}>
      {title && (
        <Stack
          isInline
          alignItems="center"
          borderBottomWidth={1}
          cursor="pointer"
          fontSize="xl"
          fontWeight={500}
          paddingBottom={2}
          spacing={2}
          onClick={handleToggle}
        >
          <Text>{title}</Text>
          <Text color="gray.500">({products.length})</Text>
          {!isToggled && <ChevronDownIcon onClick={handleToggle} />}
          {isToggled && <ChevronUpIcon onClick={handleToggle} />}
        </Stack>
      )}
      {isToggled && (
        <Box as="table" width="100%">
          <Box as="tbody">
            {products.map((product) => (
              <ProductRow key={product.id} onEdit={onEdit} onRemove={onRemove} {...product} />
            ))}
          </Box>
        </Box>
      )}
    </Stack>
  );
};

export default ProductsList;
