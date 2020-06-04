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
import {Product} from "../types";

const GoBackButton = styled(IconButton)`
  transform: rotate(180deg);
`;

// Fix margin prop getting overwrited when using chakra style props
const StyledModalContent = styled(ModalContent)`
  margin: 0;
`;

interface Props {
  product: Product;
  add: (Product) => void;
  onClose: () => void;
}

export default function ProductDetails({product, add, onClose}: Props) {
  const {image, description, title, price, options} = product;

  // @TODO: Add "add product" logic
  // add(product)
  // add({...product, options})

  return (
    <Modal isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <StyledModalContent
        display="flex"
        flexDirection={{
          base: "column",
          md: "row",
        }}
        height={{
          base: "100vh",
          md: "26rem",
        }}
        maxWidth={{
          md: "50rem",
        }}
        overflowY={{
          base: "scroll",
          md: "visible",
        }}
        position="relative"
      >
        {image && (
          <Box
            borderBottomWidth={{
              base: 1,
              md: 0,
            }}
            borderRightWidth={{
              md: 1,
            }}
            position="relative"
          >
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
              height={{
                base: 48,
                md: "26rem",
              }}
              width={{
                base: "100%",
                md: "26rem",
              }}
            />
          </Box>
        )}
        <ProductOptionsForm
          options={options}
          onSubmit={(...props) => {
            console.log("on submit result", props);
          }}
        >
          {({form, submit, isLoading, watch}) => {
            const quantity = watch("quantity");

            return (
              <Box position="relative">
                <Stack
                  alignItems="stretch"
                  flexGrow={1}
                  height={{md: "100%"}}
                  overflowY={{
                    md: "scroll",
                  }}
                  pb="20"
                  position="relative"
                  pt={{base: 4, md: 6}}
                  px={{base: 4, md: 8}}
                  spacing="6"
                  w={{md: "sm"}}
                >
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
                  <Box>{form}</Box>
                </Stack>
                <Button
                  backgroundColor="primary.500"
                  bottom={4}
                  color="white"
                  display="flex"
                  flexShrink={0}
                  h="12"
                  isLoading={isLoading}
                  justifyContent="space-between"
                  left={{base: 4, md: 8}}
                  marginTop="auto"
                  position={{
                    base: "fixed",
                    md: "absolute",
                  }}
                  px="4"
                  right={{base: 4, md: 8}}
                  type="submit"
                  variantColor="primary"
                  width={{
                    base: "calc(100% - 2rem)",
                    md: "calc(100% - 4rem)",
                  }}
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
                      {/* @TODO: Add options price to final price */}
                      {quantity} item{quantity > 1 ? "s" : ""}
                    </Box>
                  </Flex>
                  <Box>${price * quantity}</Box>
                </Button>
              </Box>
            );
          }}
        </ProductOptionsForm>
      </StyledModalContent>
    </Modal>
  );
}
