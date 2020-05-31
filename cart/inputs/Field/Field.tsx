import React from "react";
import {FieldError} from "react-hook-form";

import RadioField from "./RadioField";
import TextField from "./TextField";

import {Field} from "~/tenant/types";

interface Props {
  error?: FieldError;
  field: Field;
  value?: string;
  onChange: (field: string) => void;
}

const FieldInput: React.FC<Props> = ({error, field, value, onChange}) => {
  if (field.type === "radio") {
    return <RadioField error={error?.message} field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "text") {
    return <TextField error={error?.message} field={field} value={value} onChange={onChange} />;
  }
};

export default FieldInput;
