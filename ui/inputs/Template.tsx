import React from "react";
import {Textarea, Stack, Box} from "@chakra-ui/core";
import template from "lodash.template";

interface Props {
  value?: string;
  onChange: (template: string) => void;
  data: any;
}

const TemplateInput: React.FC<Props> = ({value, onChange, data}) => {
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
    <Stack spacing={{base: 3, sm: 6}}>
      <Textarea minHeight={48} value={value} onChange={handleChange} />
      <Box
        as="pre"
        backgroundColor="primary.100"
        fontFamily="sans-serif"
        fontSize="14px"
        padding={3}
        whiteSpace="pre-wrap"
      >
        {preview}
      </Box>
    </Stack>
  );
};

export default TemplateInput;
