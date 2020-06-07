import React from "react";
import {action} from "@storybook/addon-actions";

import Image from "./Image";

export const empty = () => <Image onChange={action("change")} />;
export const full = () => (
  <Image value="https://placehold.it/256x256" onChange={action("change")} />
);
export const wide = () => (
  <Image height={32} value="https://placehold.it/256x256" width={64} onChange={action("change")} />
);
export const broken = () => (
  <Image value="https://placeold.it/256x256" onChange={action("change")} />
);

export default {title: "UI/Inputs/Image"};
