import React from "react";
import {Image, Input, Flex, Spinner, Button} from "@chakra-ui/core";

import storage from "../../storage/api";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const ImageInput: React.FC<Props> = ({value, onChange}) => {
  const [isLoading, setLoading] = React.useState(false);

  async function upload(file?: File) {
    if (!file) return;

    setLoading(true);
    onChange(await storage.upload(file));
    setLoading(false);
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
