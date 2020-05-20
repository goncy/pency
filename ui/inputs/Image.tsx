import React from "react";
import {Image, Input, Flex, Spinner, Button} from "@chakra-ui/core";

import storage from "~/storage/api";
import {Quality} from "~/storage/types";
import {useToast} from "~/hooks/toast";
import {useTenant} from "~/tenant/hooks";

interface Props {
  value?: string;
  quality?: Quality;
  onChange: (value: string) => void;
}

const ImageInput: React.FC<Props> = ({value, onChange, quality = "low"}) => {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const { slug: tenant } = useTenant();
  
  async function upload(file?: File) {
    if (!file) return;

    try {
      setLoading(true);

      const url = await storage.upload(file, quality, tenant);

      onChange(url);
      setLoading(false);
    } catch (e) {
      toast({
        title: "Error",
        description: "Hubo un error subiendo la imágen, intentá de nuevo mas tarde",
        status: "error",
      });
    }
  }

  return (
    <Flex
      alignItems="center"
      backgroundColor="gray.100"
      cursor="pointer"
      justifyContent="center"
      p={4}
      position="relative"
    >
      {isLoading && (
        <Flex
          alignItems="center"
          background="rgba(0,0,0,0.2)"
          height="100%"
          justifyContent="center"
          left={0}
          position="absolute"
          top={0}
          width="100%"
        >
          <Spinner color="primary.500" zIndex={2} />
        </Flex>
      )}
      {value ? <Image src={value} /> : <Button isDisabled={isLoading}>Cargar imágen</Button>}
      <Input
        accept="image/*"
        height="100%"
        left={0}
        name="image"
        opacity={0}
        placeholder="Imágen"
        position="absolute"
        top={0}
        type="file"
        width="100%"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => upload(event.target.files?.[0])}
      />
    </Flex>
  );
};

export default ImageInput;
