import React from "react";
import {
  Stack,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Text,
  Button,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/core";
import styled from "@emotion/styled";

import ProductOptionsForm from "../forms/ProductOptionsForm";
import ProductQuantityInput from "../inputs/ProductQuantityInput";
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
      <ModalContent height="100vh" m={0} overflowY="scroll" pb="16" position="relative">
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
        <Stack flexGrow={1} p={4} spacing="6">
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {title}
            </Text>
            {description && (
              <Text color="gray.500" fontSize="sm">
                {description}
              </Text>
            )}
          </Box>
          <Box>
            <ProductOptionsForm
              options={options}
              onSubmit={(...props) => {
                console.log("on submit result", props);
              }}
            >
              {({form, submit, isLoading}) => <>{form}</>}
            </ProductOptionsForm>
          </Box>
          <FormControl>
            <FormLabel mb="1">Cantidad</FormLabel>
            <ProductQuantityInput />
          </FormControl>
        </Stack>
        <Button
          backgroundColor="primary.500"
          bottom="4"
          color="white"
          display="flex"
          h="12"
          justifyContent="space-between"
          left="4"
          marginTop="auto"
          position="fixed"
          px="4"
          right="4"
          type="submit"
          // isLoading={isLoading}
          variantColor="primary"
          width="calc(100% - 2rem)"
          zIndex={1}
          onClick={(event) => {
            event.stopPropagation();

            console.log("submit form");
            // submit();
          }}
        >
          <Flex alignItems="center">
            Agregar
            <Box
              backgroundColor="blackAlpha.300"
              borderRadius="md"
              fontSize="sm"
              fontWeight="normal"
              ml="2"
              px="2"
              py="2px"
            >
              1 item
            </Box>{" "}
            {/* @TODO: Add dynamic quantity */}
          </Flex>
          <Box>$239.99</Box> {/* @TODO: Add dynamic price */}
        </Button>
      </ModalContent>
    </Modal>
  );
}
