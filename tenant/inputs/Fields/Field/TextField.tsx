import React from "react";
import produce from "immer";

import {TextField} from "../../../types";

import FormControl from "~/ui/form/FormControl";
import Input from "~/ui/inputs/Input";

interface Props {
  value: Partial<TextField>;
  onChange: (value: Partial<TextField>) => void;
  error?: {
    index: number;
    type: string;
    message: string;
  };
}

const TextFieldInput: React.FC<Props> = ({value, onChange}) => {
  function handleChange(note) {
    onChange(
      produce(value, (value) => {
        value.note = note;
      }),
    );
  }

  return (
    <FormControl help="Máximo 70 caracteres" label="Nota" width="100%">
      <Input
        maxLength={70}
        placeholder="Solo se entrega a zona sur"
        roundedRight={0}
        value={value.note}
        onChange={(event) => handleChange(event.target.value || "")}
      />
    </FormControl>
  );
};

export default TextFieldInput;
