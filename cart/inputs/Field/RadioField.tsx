import React from "react";
import {Stack, Text, RadioGroup, Radio} from "@chakra-ui/core";
import {Message} from "react-hook-form";

import {RadioField} from "~/tenant/types";
import FormControl from "~/ui/controls/FormControl";

interface Props {
  value: string;
  field: RadioField;
  onChange: (value: string) => void;
  error?: Message;
}

const RadioFieldInput: React.FC<Props> = ({value, field, onChange, error}) => {
  return (
    <FormControl error={error} label={field.title} width="100%">
      <RadioGroup
        value={value}
        variantColor="primary"
        width="100%"
        onChange={(event) => onChange(event.target.value)}
      >
        {field.options.map((option) => (
          <Radio isFullWidth value={option.title}>
            <Stack isInline justifyContent="space-between" width="100%">
              <Text fontWeight={300}>{option.title}</Text>
              <Text color="gray.400" fontSize="sm" fontWeight={500}>
                {option.note}
              </Text>
            </Stack>
          </Radio>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioFieldInput;
