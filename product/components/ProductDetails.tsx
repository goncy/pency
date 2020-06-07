import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  // DrawerCloseButton,
  Stack,
  Flex,
  Box,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/core";
import styled from "@emotion/styled";

import ProductOptionsForm from "../forms/ProductOptionsForm";
import {Product} from "../types";

const GoBackButton = styled(IconButton)`
  transform: rotate(180deg);
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
    <ProductOptionsForm
      options={options}
      onSubmit={(...props) => {
        console.log("on submit result", props);
      }}
    >
      {({form, submit, isLoading, watch}) => {
        const formValues = watch();

        const optionsPrice = Object.keys(formValues)
          .filter((key) => key.startsWith("options"))
          .reduce((optionsTotal, optionKey) => {
            const optionsTypeTotal = formValues[optionKey]
              .map((option) => option.price || 0)
              .reduce((a, b) => a + b, 0);

            return optionsTotal + optionsTypeTotal;
          }, 0);

        const totalPrice = price * formValues.quantity + optionsPrice;

        return (
          <Drawer isOpen={true} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
              maxWidth="auto"
              width={{
                base: "100%",
                md: "lg",
              }}
            >
              <Box overflowY="scroll">
                {image && (
                  <Box borderBottomWidth={1} borderColor="gray.100" position="relative">
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
                        md: "xs",
                      }}
                      width={{
                        base: "100%",
                        md: "100%",
                      }}
                    />
                  </Box>
                )}
                <Box position="relative">
                  <Stack
                    alignItems="stretch"
                    flexGrow={1}
                    pb="24"
                    pt={{base: 4, md: 6}}
                    px={{base: 4, md: 8}}
                    spacing="6"
                  >
                    <Box>
                      <Text fontSize="xl" fontWeight="bold">
                        {title}
                      </Text>
                      {description && (
                        <Text color="gray.600" fontSize="sm">
                          {description}
                        </Text>
                      )}
                    </Box>
                    <Box>{form}</Box>
                  </Stack>
                </Box>
              </Box>
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
                position="fixed"
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
                    {formValues.quantity} item{formValues.quantity > 1 ? "s" : ""}
                  </Box>
                </Flex>
                <Box>${totalPrice}</Box>
              </Button>
            </DrawerContent>
          </Drawer>
        );
      }}
    </ProductOptionsForm>
  );
}
