import React from "react";

import {Field} from "../../types";

import RadioGroup from "~/ui/inputs/RadioGroup";
import Radio from "~/ui/inputs/Radio";

interface Props {
  onChange: (type: Field["type"]) => void;
  value: Field["type"];
}

const TypeInput: React.FC<Props> = ({value, onChange}) => {
  return (
    <RadioGroup
      isInline
      value={value}
      onChange={(event) => onChange(event.target.value as Field["type"])}
    >
      <Radio value="radio">Opciones</Radio>
      <Radio value="text">A completar</Radio>
    </RadioGroup>
  );
};

export default TypeInput;
