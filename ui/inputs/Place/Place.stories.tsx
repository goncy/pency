import React from "react";
import {action} from "@storybook/addon-actions";

import Place from "./Place";

export const base = () => <Place onChange={action("change")} />;
export const initialValue = () => (
  <Place
    value={{address: "Some address", coordinates: {lat: 0, lng: 0}}}
    onChange={action("change")}
  />
);

export default {title: "UI/Inputs/Place"};
