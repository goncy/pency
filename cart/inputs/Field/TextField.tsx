import React from "react";
import {Message} from "react-hook-form";

import {TextField} from "~/tenant/types";
import FormControl from "~/ui/controls/FormControl";
import Input from "~/ui/inputs/Input";

interface Props {
  value: string;
  field: TextField;
  onChange: (value: string) => void;
  error?: Message;
}

const TextFieldInput: React.FC<Props> = ({value, field, onChange, error}) => {
  return (
    <FormControl error={error} help={field.note} label={field.title} width="100%">
      <Input
        maxLength={70}
        paddingX={0}
        roundedRight={0}
        value={value}
        variant="flushed"
        onChange={(event) => onChange(event.target.value || "")}
      />
    </FormControl>
  );
};

export default TextFieldInput;
