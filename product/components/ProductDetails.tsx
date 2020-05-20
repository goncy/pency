import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Image,
  Text,
  IconButton,
  Button,
} from "@chakra-ui/core";
import styled from "@emotion/styled";

import ProductOptionsForm from "../forms/ProductOptionsForm";
import {Product} from "../types";

const GoBackButton = styled(IconButton)`
  transform: rotate(180deg);
`;

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductDetails({product, onClose}: Props) {
  const {image, description, title, price, options} = product;

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mt={0}>
        {image && (
          <Box borderBottomWidth={1} position="relative">
            <GoBackButton
              aria-label="Close product details"
              icon="arrow-forward"
              ml={2}
              mt={2}
              position="absolute"
              variant="ghost"
              onClick={onClose}
            />
            <Box
              backgroundImage={`url(${image})`}
              backgroundPosition="center"
              backgroundSize="cover"
              height={48}
              width="100%"
            />
          </Box>
        )}
        <Box p={4}>
          <Box mb={6}>
            <Text fontSize="xl" fontWeight="bold">
              {title}
            </Text>
            {description && (
              <Text color="gray.500" fontSize="sm">
                {description}
              </Text>
            )}
          </Box>
          <ProductOptionsForm
            options={options}
            onSubmit={(...props) => {
              console.log("on submit result", props);
            }}
          >
            {({form, submit, isLoading}) => (
              <>
                {form}
                <Button
                  backgroundColor="primary.500"
                  color="white"
                  isLoading={isLoading}
                  type="submit"
                  variantColor="primary"
                  w="100%"
                  onClick={(event) => {
                    event.stopPropagation();

                    submit();
                  }}
                >
                  Agregar
                </Button>
              </>
            )}
          </ProductOptionsForm>
        </Box>
      </ModalContent>
    </Modal>
  );
}
