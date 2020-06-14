import React from "react";
import {Switch, SwitchProps, Stack} from "@chakra-ui/core";
import shortid from "shortid";

import FormLabel from "../form/FormLabel";

interface Props extends Omit<SwitchProps, "onChange"> {
  value?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  name?: string;
}

const SwitchInput: React.FC<Props> = ({checked = false, onChange, label, name, ...props}) => {
  const {current} = React.useRef(shortid.generate());

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked);
  }

  return (
    <Stack isInline alignItems="center">
      <Switch
        color="primary"
        height="21px"
        id={current}
        isChecked={checked}
        lineHeight="normal"
        name={name}
        value={checked}
        onChange={handleChange}
        {...props}
      />
      {label && (
        <FormLabel
          cursor="pointer"
          fontSize={{base: "sm", sm: "md"}}
          fontWeight={500}
          name={current}
          style={{padding: 0}}
        >
          {label}
        </FormLabel>
      )}
    </Stack>
  );
};

export default SwitchInput;
