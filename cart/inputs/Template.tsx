import React from "react";
import {Textarea, Stack, Box} from "@chakra-ui/core";

import {MOCK_CART} from "../constants";
import {getMessage} from "../selectors";

interface Props {
  value?: string;
  onChange: (template: string) => void;
}

const TemplateInput: React.FC<Props> = ({value, onChange}) => {
  const preview = React.useMemo(() => {
    try {
      return value ? getMessage(value, MOCK_CART) : "";
    } catch (e) {
      return `ERROR: Este mensaje no es valido: ${e}`;
    }
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    return onChange(event.target.value);
  }

  return (
    <Stack position="relative" spacing={4}>
      <Textarea minHeight={48} value={value} onChange={handleChange} />
      {value && (
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
