import React from "react";
import {RadioGroup as ChakraRadioGroup, Radio as ChakraRadio} from "@chakra-ui/core";
import styled from "@emotion/styled";

import Input from "~/ui/inputs/Input";
import {Variant} from "~/product/types";

const Radio = styled(ChakraRadio)`
  [type="radio"] {
    background: white;
  }
`;

const RadioGroup = styled(ChakraRadioGroup)`
  & > div {
    width: 100%;
  }
`;

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
    <RadioGroup isInline display="flex" value={value} onChange={handleChange}>
      <Radio
        backgroundColor="gray.100"
        padding={2}
        rounded="md"
        value={1}
        variantColor="primary"
        width="100%"
      >
        Una
      </Radio>
      <Radio
        backgroundColor="gray.100"
        padding={2}
        rounded="md"
        value={0}
        variantColor="primary"
        width="100%"
      >
        Ilimitadas
      </Radio>
      <Radio
        backgroundColor="gray.100"
        paddingLeft={2}
        rounded="md"
        value={count}
        variantColor="primary"
        width="100%"
      >
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
          variant="filled"
          onChange={handleCountChange}
          onFocus={handleCountFocus}
        />
      </Radio>
    </RadioGroup>
  );
};

export default CountInput;
