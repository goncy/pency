import React from "react";

import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

export const base = () => (
  <RadioGroup value={1}>
    <Radio value={0}>Valor 0</Radio>
    <Radio value={1}>Valor 1</Radio>
    <Radio value={2}>Valor 2</Radio>
  </RadioGroup>
);

export default {title: "UI/Inputs/Radio"};
