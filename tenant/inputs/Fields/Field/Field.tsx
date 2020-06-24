import React from "react";

import {Field} from "../../../types";

import RadioField from "./RadioField";
import TextField from "./TextField";

interface Props {
  index: number;
  error?: {
    index: number;
    type: string;
    message: string;
  };
  value: Partial<Field>;
  onChange: (field: Partial<Field>) => void;
}

const FieldInput: React.FC<Props> = ({error, value, onChange}) => {
  if (value.type === "radio") {
    return <RadioField error={error} value={value} onChange={onChange} />;
  }

  if (value.type === "text") {
    return <TextField error={error} value={value} onChange={onChange} />;
  }
};

export default FieldInput;
