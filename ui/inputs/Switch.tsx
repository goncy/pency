import React from "react";
import {Switch, SwitchProps, Stack, FormLabel} from "@chakra-ui/core";

interface Props extends Omit<SwitchProps, "onChange"> {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  name?: string;
}

const SwitchInput: React.FC<Props> = ({checked, onChange, label, name, ...props}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked);
  }

  return (
    <Stack isInline alignItems="center">
      <Switch
        color="primary"
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
          htmlFor={name}
          style={{padding: 0}}
        >
          {label}
        </FormLabel>
      )}
    </Stack>
  );
};

export default SwitchInput;
