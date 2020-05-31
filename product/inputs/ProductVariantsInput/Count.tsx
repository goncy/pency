import React from "react";

import Input from "~/ui/inputs/Input";
import RadioGroup from "~/ui/inputs/RadioGroup";
import Radio from "~/ui/inputs/Radio";
import {Variant} from "~/product/types";

interface Props {
  onChange: (count: Variant["count"]) => void;
  value: Variant["count"];
}

const CountInput: React.FC<Props> = ({value, onChange}) => {
  const initialCount = value > 1 ? value : undefined;
  const [count, setCount] = React.useState<number>(initialCount);

  function handleChange(event) {
    onChange(Number(event.target.value));
  }

  function handleCountChange(event) {
    const value = Number(event.target.value);

    setCount(value);
    onChange(value);
  }

  function handleCountFocus(event) {
    const value = Number(event.target.value);

    if (value > 1) {
      onChange(value);
    }
  }

  return (
    <RadioGroup isInline value={value} onChange={handleChange}>
      <Radio value={1}>Una</Radio>
      <Radio value={0}>Ilimitadas</Radio>
      <Radio paddingRight={0} paddingY={0} value={count}>
        <Input
          _placeholder={{
            color: "black",
          }}
          color="black"
          defaultValue={initialCount}
          fontSize="16px"
          height={10}
          placeholder="Definir"
          roundedLeft={0}
          roundedRight="md"
          size="sm"
          onChange={handleCountChange}
          onFocus={handleCountFocus}
        />
      </Radio>
    </RadioGroup>
  );
};

export default CountInput;
