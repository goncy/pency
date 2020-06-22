import React from "react";

import Input from "~/ui/inputs/Input";
import RadioGroup, {RadioColumn} from "~/ui/inputs/Radio";
import {Variant} from "~/product/types";

interface Props {
  onChange: (count: Variant["count"]) => void;
  value: Variant["count"];
}

const CountInput: React.FC<Props> = ({value, onChange}) => {
  const initialCount = value > 1 ? value : undefined;
  const countRef = React.useRef<HTMLInputElement>();
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
      <RadioColumn value={1}>Una</RadioColumn>
      <RadioColumn value={0}>Ilimitadas</RadioColumn>
      <RadioColumn
        paddingRight={0}
        paddingY={0}
        value={count}
        onClick={() => countRef?.current.focus()}
      >
        <Input
          ref={countRef}
          _placeholder={{
            color: "black",
          }}
          color="black"
          defaultValue={initialCount}
          fontSize="16px"
          height="43px"
          placeholder="Definir"
          roundedLeft={0}
          roundedRight="md"
          size="sm"
          type="number"
          onChange={handleCountChange}
          onFocus={handleCountFocus}
        />
      </RadioColumn>
    </RadioGroup>
  );
};

export default CountInput;
