import React from "react";
import {Flex, Button, Stack} from "@chakra-ui/core";

import {Product} from "../types";
import ProductForm from "../forms/ProductForm";

interface Props {
  product: Product;
  update: (product: Product) => void;
  remove: () => void;
}

const ProductEdit: React.FC<Props> = ({product, update, remove}) => {
  const [isRemoving, setRemoving] = React.useState(false);

  function handleUpdate(product: Product) {
    return update(product);
  }

  async function handleRemove() {
    setRemoving(true);

    await remove();

    setRemoving(false);
  }

  return (
    <ProductForm defaultValues={product} onSubmit={handleUpdate}>
      {({form, isLoading, submit}) => (
        <Flex>
          <Stack spacing={4} width="100%">
            {form}
            <Flex justifyContent="space-between">
              <Button
                alignSelf="flex-end"
                isDisabled={isLoading}
                isLoading={isRemoving}
                mt={4}
                variantColor="red"
                onClick={handleRemove}
              >
                Borrar
              </Button>
              <Button
                alignSelf="flex-end"
                isDisabled={isRemoving}
                isLoading={isLoading}
                mt={4}
                type="submit"
                onClick={submit}
              >
                Guardar
              </Button>
            </Flex>
          </Stack>
        </Flex>
      )}
    </ProductForm>
  );
};

export default ProductEdit;
