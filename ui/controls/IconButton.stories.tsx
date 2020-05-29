import React from "react";

import PlusIcon from "../icons/Plus";

import IconButton from "./IconButton";

export const justIcon = () => <IconButton leftIcon={PlusIcon} />;
export const iconAndText = () => <IconButton leftIcon={PlusIcon}>Add</IconButton>;
export const collapsable = () => (
  <IconButton isCollapsable leftIcon={PlusIcon}>
    Add
  </IconButton>
);

export default {title: "UI/Controls/IconButton"};
