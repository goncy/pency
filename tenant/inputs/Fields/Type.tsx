import React from "react";

import {Field} from "../../types";

import RadioGroup, {RadioColumn} from "~/ui/inputs/Radio";

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
      <RadioColumn value="radio">Opciones</RadioColumn>
      <RadioColumn value="text">A completar</RadioColumn>
    </RadioGroup>
  );
};

export default TypeInput;
