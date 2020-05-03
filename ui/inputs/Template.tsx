import React from "react";
import {Textarea, Stack, Box, Text, Button, Flex} from "@chakra-ui/core";
import template from "lodash.template";

interface Props {
  value?: string;
  onChange: (template: string) => void;
  data: Record<string, unknown>;
}

const TemplateInput: React.FC<Props> = ({value, onChange, data}) => {
  const [isEnabled, setEnabled] = React.useState(false);
  const preview = React.useMemo(() => {
    try {
      const compile = template(value);

      return value ? compile(data) : "";
    } catch (e) {
      return `Este mensaje no es valido: ${e}`;
    }
  }, [data, value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    return onChange(event.target.value);
  }

  return (
    <Stack position="relative" spacing={4}>
      {!isEnabled && (
        <Flex
          alignItems="center"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          position="absolute"
          width="100%"
        >
          <Box
            background="black"
            height="100%"
            opacity={0.75}
            position="absolute"
            rounded="sm"
            width="100%"
          />
          <Stack
            backgroundColor="primary.50"
            margin={4}
            padding={4}
            rounded="sm"
            spacing={4}
            zIndex={1}
          >
            <Text>Este es un campo avanzado, solo cambialo si sabés como hacerlo.</Text>
            <Button onClick={() => setEnabled(true)}>Habilitar</Button>
          </Stack>
        </Flex>
      )}
      <Textarea isDisabled={!isEnabled} minHeight={48} value={value} onChange={handleChange} />
      {isEnabled && (
        <Box
          as="pre"
          backgroundColor="primary.50"
          fontFamily="sans-serif"
          fontSize="14px"
          padding={3}
          whiteSpace="pre-wrap"
        >
          {preview}
        </Box>
      )}
    </Stack>
  );
};

export default TemplateInput;
