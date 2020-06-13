import React from "react";

import {Option} from "~/product/types";
import RadioGroup, {RadioRow} from "~/ui/inputs/Radio";

interface Props {
  value: Option[];
  onChange: (value: Option[]) => void;
  options: Option[];
}

const SingleInput: React.FC<Props> = ({value, onChange, options}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const option = options.find((option) => option.id === event.target.value);

    onChange([option]);
  }

  return (
    <RadioGroup value={value[0]?.id} onChange={handleChange}>
      {options.map((option) => (
        <RadioRow key={option.id} note={`+ $${option.price}`} value={option.id}>
          {option.title}
        </RadioRow>
      ))}
    </RadioGroup>
  );
};

export default SingleInput;
