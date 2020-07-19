import React from "react";
import faker from "faker";

import Input from "../inputs/Input";

import FormControl from "./FormControl";

export const base = () => (
  <FormControl>
    <Input placeholder="Some input" />
  </FormControl>
);
export const withLabel = () => (
  <FormControl label={faker.lorem.words(2)}>
    <Input placeholder="Some input" />
  </FormControl>
);
export const withLabelRequired = () => (
  <FormControl isRequired label={faker.lorem.words(2)}>
    <Input placeholder="Some input" />
  </FormControl>
);
export const withLabelRequiredAndError = () => (
  <FormControl isRequired error={faker.lorem.words(5)} label={faker.lorem.words(2)}>
    <Input placeholder="Some input" />
  </FormControl>
);
export const withLabelRequiredAndHelp = () => (
  <FormControl isRequired help={faker.lorem.words(7)} label={faker.lorem.words(2)}>
    <Input placeholder="Some input" />
  </FormControl>
);
export const withLabelRequiredHelpAndInfo = () => (
  <FormControl
    isRequired
    help={faker.lorem.words(7)}
    info={faker.lorem.lines(3)}
    label={faker.lorem.words(2)}
  >
    <Input placeholder="Some input" />
  </FormControl>
);

export default {title: "UI/Form/FormControl"};
