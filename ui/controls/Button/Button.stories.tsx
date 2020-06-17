import React from "react";

import Button from "./Button";

export const base = () => <Button>Some button</Button>;
export const primary = () => <Button variantColor="primary">Some button</Button>;
export const big = () => (
  <Button size="lg" variantColor="primary">
    Some button
  </Button>
);
export const raised = () => (
  <Button boxShadow="lg" size="lg" variantColor="primary">
    Some button
  </Button>
);

export default {title: "UI/Controls/Button"};
