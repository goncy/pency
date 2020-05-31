import React from "react";
import {Stack, Text, Radio} from "@chakra-ui/core";
import {Message} from "react-hook-form";

import {RadioField} from "~/tenant/types";
import FormControl from "~/ui/controls/FormControl";
import RadioGroup from "~/ui/inputs/RadioGroup";

interface Props {
  value: string;
  field: RadioField;
  onChange: (value: string) => void;
  error?: Message;
}

const RadioFieldInput: React.FC<Props> = ({value, field, onChange, error}) => {
  return (
    <FormControl error={error} label={field.title} width="100%">
      <RadioGroup value={value} onChange={(event) => onChange(event.target.value)}>
        {field.options.map((option) => (
          <Radio
            isFullWidth
            borderBottomWidth={1}
            paddingBottom={4}
            paddingTop={2}
            size="lg"
            value={option.title}
          >
            <Stack isInline alignItems="center" justifyContent="space-between" width="100%">
              <Text fontSize="sm" fontWeight={300}>
                {option.title}
              </Text>
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
