import React from "react";

import RadioField from "./RadioField";
import TextField from "./TextField";

import {Field} from "~/tenant/types";

interface Props {
  field: Field;
  value?: Field["value"];
  onChange: (field: string) => void;
}

const FieldInput: React.FC<Props> = ({field, value, onChange}) => {
  if (field.type === "radio") {
    return <RadioField field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "text") {
    return <TextField field={field} value={value} onChange={onChange} />;
  }
};

export default FieldInput;
