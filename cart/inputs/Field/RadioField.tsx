import React from "react";

import {RadioField} from "~/tenant/types";
import FormControl from "~/ui/form/FormControl";
import RadioGroup, {RadioRow} from "~/ui/inputs/Radio";

interface Props {
  value: string;
  field: RadioField;
  onChange: (value: string) => void;
}

const RadioFieldInput: React.FC<Props> = ({value, field, onChange}) => {
  return (
    <FormControl isRequired={field.required} label={field.title} width="100%">
      <RadioGroup value={value} onChange={(event) => onChange(event.target.value)}>
        {field.options.map((option) => (
          <RadioRow key={option.id} note={option.note} value={option.title}>
            {option.title}
          </RadioRow>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioFieldInput;
