import React from "react";

import RadioGroup, {RadioRow, RadioColumn} from ".";

export const columns = () => (
  <RadioGroup isInline value={1}>
    <RadioColumn value={0}>Valor 0</RadioColumn>
    <RadioColumn value={1}>Valor 1</RadioColumn>
    <RadioColumn value={2}>Valor 2</RadioColumn>
  </RadioGroup>
);

export const rows = () => (
  <RadioGroup value={1}>
    <RadioRow value={0}>Valor 0</RadioRow>
    <RadioRow note="some note" value={1}>
      Valor 1
    </RadioRow>
    <RadioRow value={2}>Valor 2</RadioRow>
  </RadioGroup>
);

export default {title: "UI/Inputs/Radio"};
