import React from "react";
import {PseudoBox, Flex, Spinner, Text, Box, Stack, BoxProps} from "@chakra-ui/core";

import TrashIcon from "../icons/Trash";
import PlusIcon from "../icons/Plus";
import Image from "../feedback/Image";

import Input from "./Input";

import storage from "~/storage/api";
import {Quality} from "~/storage/types";
import {useToast} from "~/hooks/toast";
import {useTenant} from "~/tenant/hooks";

interface Props {
  value?: string;
  quality?: Quality;
  onChange: (value: string) => void;
  width?: BoxProps["width"];
  height?: BoxProps["height"];
}

const ImageInput: React.FC<Props> = ({
  width = 16,
  height = 16,
  value,
  onChange,
  quality = "low",
}) => {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const {slug: tenant} = useTenant();

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    // Perist event so we can reset on fail
    event.persist();

    // Store file
    const file = event.target.files?.[0];

    // Return if closed without selecting a file
    if (!file) return;

    try {
      // Toggle loading
      setLoading(true);

      // Get uploaded image url
      const url = await storage.upload(file, quality, tenant);

      // Return it to parent
      onChange(url);

      // Reset loading
      setLoading(false);
    } catch (e) {
      // Reset loading
      setLoading(false);

      // Show toast to user
      toast({
        title: "Error",
        description:
          "Hubo un error subiendo la imágen, intentá de nuevo mas tarde o probá cargando otra imágen",
        status: "error",
      });

      // Reset input
      event.target.value = "";
    }
  }

  return (
    <Box height={height} position="relative" width={width}>
      {isLoading && (
        <Flex
          alignItems="center"
          background="rgba(0,0,0,0.2)"
          height="100%"
          justifyContent="center"
          left={0}
          position="absolute"
          rounded="lg"
          top={0}
          width="100%"
          zIndex={2}
        >
          <Spinner color="primary.500" zIndex={3} />
        </Flex>
      )}
      {value ? (
        <Box height="100%" rounded="lg" width="100%">
          <PseudoBox
            _hover={{
              opacity: 1,
            }}
            alignItems="center"
            background="rgba(0,0,0,0.2)"
            color="white"
            cursor="pointer"
            display="flex"
            height="100%"
            justifyContent="center"
            left={0}
            opacity={0}
            position="absolute"
            rounded="lg"
            top={0}
            transition="opacity 0.25s"
            width="100%"
            zIndex={1}
            onClick={() => onChange("")}
          >
            <TrashIcon />
          </PseudoBox>
          <Image boxShadow="inset 0 0 2px rgba(0,0,0,0.2)" rounded="lg" src={value} />
        </Box>
      ) : (
        <PseudoBox
          _hover={{
            backgroundColor: "gray.200",
          }}
          alignItems="center"
          backgroundColor="gray.100"
          color="gray.400"
          display="flex"
          height={height}
          justifyContent="center"
          position="relative"
          rounded="lg"
          transition="background-color .25s"
          width={width}
        >
          <Input
            accept="image/*"
            cursor="pointer"
            height="100%"
            left={0}
            name="image"
            opacity={0}
            placeholder="Imágen"
            position="absolute"
            title="Cargar imágen"
            top={0}
            type="file"
            width="100%"
            onChange={handleUpload}
          />
          <Stack alignItems="center" justifyContent="center" spacing={0}>
            <PlusIcon />
            <Text fontSize="xs">Imágen</Text>
          </Stack>
        </PseudoBox>
      )}
    </Box>
  );
};

export default ImageInput;
